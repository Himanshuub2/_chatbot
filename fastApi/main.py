from fastapi import FastAPI, WebSocket, Request, Depends, HTTPException, Response,Body
from fastapi.responses import HTMLResponse
from language_cognitive.lca import clu_request
# from database.connect import database
# from database.db import df, engine
from queryDictionary import querySet
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
from msal import PublicClientApplication
from fastapi.security import OAuth2AuthorizationCodeBearer
from urllib.parse import unquote
from fastapi.responses import JSONResponse
import rsa
import base64
from msal import ConfidentialClientApplication
from azure.identity import ClientSecretCredential
from ftfy import fix_text
from datetime import datetime, timedelta
from urllib.request import urlopen
import urllib3
import jwt
from cryptography.x509 import load_pem_x509_certificate
from connection import connect
import os
from dotenv import load_dotenv
from base64 import b64decode
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
import requests
# import train_data;

import ssl
from requests.adapters import HTTPAdapter

import ssl
import requests
import sample_data
import openai

from langchain import OpenAI,SQLDatabaseChain,SQLDatabase
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents import AgentExecutor



promptt = '''
    example:
    1. How many associates work under Mario
    ans. select count(*) from user_data where line_manager_name ilike "%Mario%"

    2. How many LM are present in supply function?
    ans.Select Count(Distinct associate_id) as num_line_managers From user_data Where job_family_group ilike '%Supply%'

    3.How many employees have less than 4 years of service and fall in 10-80 years old age group
    ans. SELECT COUNT(*) FROM user_data WHERE DATE_PART('year', age(CURRENT_DATE, TO_DATE(effective_date, 'YYYY-MM-DD')))<4 AND DATE_PART('year', age(CURRENT_DATE, TO_DATE(date_of_birth, 'YYYY-MM-DD'))) BETWEEN 10 AND 80;

    4.How many employees are working for P&O job_family_group
    ans. SELECT COUNT(*) FROM user_data WHERE job_family_group ilike '%P&O%'
      
    5. Line managers in supply?
    ans. Select Count(Distinct associate_id) as num_line_managers From user_data Where job_family ilike '%Supply%'

    6. Total Associates in Mars?
    ans. SELECT COUNT(*) FROM user_data where employment_status ilike '%Active%'

    7. who all work under Mario?
    ans . select associate_name from user_data where line_manager_name ilike '%Mario%'
    
    act as a mars assistant (not as sql query generator)
      for the below kind of questions,

    if the user provides out of topic queries handle them as well.
    5. Hello
    ans. How may I help you?

    6. Who are you ?
    ans . I am a Mars Assistantt


    Rules:
    - Make sure the query is postgres compitiable
    - Ensure case sensistivity while writing query
    - Don't go with strict name checking instead use "like" and "%" operator
    - Ensure NULL check
    - Do not add any special information or comment, just return the query
    - consider all 

'''
db_uri =os.environ.get("DB_URL")
db =SQLDatabase.from_uri(database_uri=db_uri,include_tables=['user_data'])
toolkit = SQLDatabaseToolkit(db=db)
agent_executor = create_sql_agent(
    llm=OpenAI(temperature=0),
    toolkit=toolkit,
    verbose=True
)
print(db.table_info)
llm = OpenAI(openai_api_key="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",temperature=0)
db_chain = SQLDatabaseChain(llm=llm,database=db,prompt=promptt,verbose=True,use_query_checker=True)

agent_executor.run("how many employees are under age of 50?")
app = FastAPI()


html = '''
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/k-ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
'''


@app.websocket("/k-ws")
async def websocket_endpoint(websocket: WebSocket,jwt_token:str,reconnect:str):
    final = websocket.query_params["jwt_token"]
   
    # print(final)
    # print(reconnect)
    if(final != "null"):
        # try:
        #     resp = decodeJWT(final)
        # except:
        if(reconnect=="false"):
            await websocket.accept()
            # await websocket.send_json({ "messages":["Hello ! My name is Martie.","I am still new to Mars, so at this time I can only answer questions on a limited number of subjects.","If you ask a question that I am not familiar with, you may receive a response stating that I don't have an answer.I am always learning, so I will be able to answer additional questions in the coming weeks."]})
        else:
            await websocket.accept()
    
    while True:
        data = await websocket.receive_json()

    
     
        if(data):
            try:
                natural_response = await GPTQueryGenerator(data)
                print( natural_response ,"--answer")
                finalResponse = {
                        "messages":[natural_response],
                        "id":0,
                        "charts":[],
                        "enable_chart":False
                    }

                await websocket.send_json(finalResponse)
            except:
                error_response = " I didnt underStand that.Please Try Again"
                await websocket.send_text(error_response)


def findIntentQuery(intent):
    for i in querySet:
        if (i == intent):
            return querySet[i]    # return array of query and send text







async def GPTQueryGenerator(data):
   
    preambleForData = f'''Act as a  companiesHi SQL Query generator
    You have given below postgres table Schema, Please create SQL query based on below details
    Company Name: Company
    Table name: user_data,
    CREATE TABLE user_data(
        id integer not null ,
        index integer,
        line_manager_id bigint,
        position_id integer,
        supervisory_organization_id integer,
        associate_id integer,
        suporg_level_00id integer,
        job_level text,
        job_profile text,
        employment_status text,
        segment text,
        site_code text,
        sub_segment text,
        suporg_level00 text,
        suporg_level_01 text,
        suporg_level_01id int,
        suporg_level_02 text,
        suporg_level_02id text,
        suporg_level_03 text,
        suporg_level_03id text,
        suporg_level_04 text,
        suporg_level_04id text,
        suporg_level05 text,
        suporg_level_05id text,
        suporg_level_06 text,
        suporg_level_06id text,
        suporg_level_07 text,
        suporg_level_07id text,
        suporg_level08 text,
        suporg_level_08id text,
        suporg_level_09 text,
        suporg_level_9id text,
        suporg_level_10 text,
        suporg_level_10id text,
        suporg_level_11 text,
        suporg_level_11id text,
        supervisory_organization text,
        user_name text,
        date_of_birth text,
        gender text,
        business_email text,
        effective_date text,
        associate_name text,
        line_manager_name text,
        business_title text,
        job_family text,
        job_family_group text,
    )
    Refer below sample data for your referance,
    

   {sample_data}

    example:
    1. How many associates work under Mario
    ans. select count(*) from user_data where line_manager_name ilike "%Mario%"

    2. How many LM are present in supply function?
    ans.Select Count(Distinct associate_id) as num_line_managers From user_data Where job_family_group ilike '%Supply%'

    3.How many employees have less than 4 years of service and fall in 10-80 years old age group
    ans. SELECT COUNT(*) FROM user_data WHERE DATE_PART('year', age(CURRENT_DATE, TO_DATE(effective_date, 'YYYY-MM-DD')))<4 AND DATE_PART('year', age(CURRENT_DATE, TO_DATE(date_of_birth, 'YYYY-MM-DD'))) BETWEEN 10 AND 80;

    4.How many employees are working for P&O job_family_group
    ans. SELECT COUNT(*) FROM user_data WHERE job_family_group ilike '%P&O%'
      
    5. Line managers in supply?
    ans. Select Count(Distinct associate_id) as num_line_managers From user_data Where job_family ilike '%Supply%'

    6. Total Associates in Mars?
    ans. SELECT COUNT(*) FROM user_data where employment_status ilike '%Active%'

    7. who all work under Mario?
    ans . select associate_name from user_data where line_manager_name ilike '%Mario%'
    
    act as a mars assistant (not as sql query generator)
    for the below kind of questions,

    5. Hello
    ans. How may I help you?

    6. Who are you ?
    ans . I am a Company Assistantt


    Rules:
    - Make sure the query is postgres compitiable
    - Ensure case sensistivity while writing query
    - Don't go with strict name checking instead use "like" and "%" operator
    - Ensure NULL check
    - Do not add any special information or comment, just return the query
    - consider all 
    
    '''


    q1=f''' '{data["question"]}' '''
   
    if(data["language_model"]=="gpt-3.5"):
        completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        temperature =0,
        max_tokens = 3500,
        messages=[
        { "role": "system", "content":f'{preambleForData}'},
        { "role": "user", "content":f'"Generate only postgreSQL query no description for: {q1}"' },
        ])
         
        
        print(completion.choices[0].message.content,"---in query with gpt 3.5")
        print(completion)
        try:
            cursor = connect()
            cursor.execute(f"{completion.choices[0].message.content}")
            # cursor = await database.execute(f"{completion.choices[0].message.content}")
            res = cursor.fetchall()
            print(res)
        except:
            res = completion.choices[0].message.content

        result = await GPT_natural_response(data,res)    
        return result

        # return "Please Provide a valid query"

#  GPT 3: 
    else:
        completion = openai.Completion.create(
            model = "text-davinci-003",
            prompt = f"{preambleForData} Generate only PostgreSQL query no description for : {q1}",
            temperature = 0,
            max_tokens = 1000,
            top_p = 1.0
        )
        print(completion)
        
        print(completion.choices[0].text,"---in query with gpt 3")
        try:
            res = await database.execute(f"{completion.choices[0].text}")
            print(res)

        except:
            res = completion.choices[0].text

        result = await GPT_natural_response(data,res)    
        return result

   


async def GPT_natural_response(data,answer):

    preambleForData = f''' We have this Question : '{data}'
        and Answer : '{answer}'
    '''

    q1 = "Write Natural Languge Response in one line for above . and greet the user also"
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        temperature =0,
        messages=[
        { "role": "system", "content":f'{preambleForData}'},
        { "role": "user", "content":f'{q1}' },
        ])
    return completion.choices[0].message.content








@app.post("/log")
async def log_details(data: Request):
    log_details = await data.json()
    conversationID, user_id, bot_id, user_name, bot_name, query, bot_response, log_data = log_details["conversationID"], log_details["user_id"], log_details[
        "bot_id"], log_details["user_name"], log_details["bot_name"], log_details["query"], log_details["response"], log_details["log_data"]
    user_details_log = await database.execute(f"insert into log_table (conversation_id,user_id,user_name,message,data) values ({conversationID},{user_id},'{user_name}','{query}','{log_data}')")
    bot_details_log = await database.execute(f"insert into log_table (conversation_id,user_id,user_name,message,data) values ({conversationID},{bot_id},'{bot_name}','{bot_response}','{log_data}')")
    return user_details_log, bot_details_log


@app.post("/feedback")
async def feedback_details(data: Request):
    feedback_details = await data.json()
    flag, username = feedback_details["flag"], feedback_details["username"]
    print(username)
    await database.execute(f"insert into user_feedback_table (conversation_id,username) values ({username},{flag})")
    return feedback_details



client_id = os.environ.get("CLIENT_ID")
JWT_SECRET = '18e4639017f7d88ff7e8a361f85a8ff30cd2d26ec9838386'
JWT_ALGORITHM = "HS256"
expiration_time = datetime.utcnow() + timedelta(minutes=3)


def generateJWT(user_id: str):
  
    payload = {
        "user_id": user_id,
        "exp":expiration_time  
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token



from azure.identity import DefaultAzureCredential
from azure.keyvault.keys import KeyClient
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
import jwt



@app.post("/token")
async def auth_handler(auth_token: Request):
    auth_token = await auth_token.json()

    try:
        email = auth_token["email"]
        access_token = generateJWT(email)
        return access_token

    except Exception as e:
        response_dict = {
            "success": False,
            "message": "not a valid auth token or User UnAuthorized"}
        return response_dict




async def middleware_check(request:Request,call_next):
    _token = request.headers["Authorization"]
    token = _token.split(" ")[1]
    try:
        valid_email =  decodeJWT(token)
        if(valid_email):
            response= await call_next(request)
            print("success")
            return response
        else:
            return "Error with Token"
    except Exception as e:
        response_dict = {
            "success": False,
            "message": "Invalid Auth Token"}
        print(response_dict["message"])
        return Response(json.dumps(response_dict))


@app.middleware("http")
async def apply_middleware(request: Request, call_next):
    print(request.url.path.startswith("/token"))
    if (request.url.path.startswith("/token")) or (request.url.path.startswith("/urltest")):
        
        response = await call_next(request)
        
    else:
       response = await middleware_check(request, call_next)
    
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    # allow_origins=["http://localhost","http://127.0.0.1:3000", 'http://localhost:8080', "http://localhost:3000", "https://samsara-web.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def decodeJWT(token: str) -> dict:    
    decoded_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)   
    expiration_time = datetime.fromtimestamp(decoded_token['exp'])    

    if datetime.utcnow() > expiration_time:
        return False
    else:
        return decoded_token


