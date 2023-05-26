import requests
from dotenv import load_dotenv
# from os import environ

import os
from dotenv import load_dotenv
# --------------------

def clu_request(query):
    load_dotenv()
    url = os.environ.get('PREDICTION_URL')
    header = {"Ocp-Apim-Subscription-Key": os.environ.get('PRIMARY_KEY'),
              "Apim-Request-Id": "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a",
              "Content-Type": "application/json"}
    body = {
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "id": "PARTICIPANT_ID_HERE",
                "text": query,
                "modality": "text",
                "participantId": "PARTICIPANT_ID_HERE"
            }
        },
        "parameters": {
            "projectName": os.environ.get('PROJECT_NAME'),
            "verbose": True,
            "deploymentName": os.environ.get('DEPLOYMENT_NAME'),
            "stringIndexType": "TextElement_V8"
        }
    }
    res = requests.post(url, headers=header, json=body,verify=False).json()
    try:
        finalIntent = checkIntent(res)
        finalEntity =  checkEntity(res)
        return finalIntent,finalEntity
        # print(res)
        # prediction = res['result']['prediction']
        
        # top_intent = prediction['intents'][0]['category'] if prediction['intents'][0]['confidenceScore'] > 0.5 else "None"
        # entity = prediction['entities']
        # return top_intent, prediction['intents'][0]['confidenceScore'],entity
    except:
        return res['error']['message']


if __name__ == "__main__":
    
    print(clu_request("Can you tell me who is the leader of Arpit in 2020?"))



def checkIntent(data):
    intents = data["result"]["prediction"]["intents"]
    topIntent = [0,0]   # (confidenceScore , index-i)

    
    for i in range(len(intents)):
        confidenceScore = intents[i]["confidenceScore"]
        if(confidenceScore>=0.7 and confidenceScore >topIntent[0]):
            topIntent[0] = confidenceScore
            topIntent[1] = i
    print(topIntent)
    if(topIntent==0):
        return "No Result Found"    
    else:
        return ( intents[topIntent[1]]["category"])
       




def checkEntity(data):
    entities = data["result"]["prediction"]["entities"]
    
    # print(entities)
    finalEntities = []
    for i in range(len(entities)):
        if(entities[i]["confidenceScore"] >= 0.5):
            entityDict = {"category":"","text":""}
            entityDict["category"] = entities[i]["category"]
            entityDict["text"] = entities[i]["text"]
            print(entityDict)
            finalEntities.append(entityDict)
            
    if  len(finalEntities) == 0 : 
        return finalEntities
    else:
        return "Entity"
    

    