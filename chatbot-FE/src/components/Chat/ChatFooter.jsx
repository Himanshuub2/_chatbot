
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { chatDetails, loading, userQuestion } from "../../redux/chatSlice";
import "../../index.css";
import { useState } from "react";
import { sample2 } from "../../sample/sample";



const ChatFooter = ({sendMessage}) => {
  const dispatch = useDispatch();



  const [question, setQuestion] = useState("");



  const handleSubmit = async (e) => {

    // webSocket.send(question);
    console.log(question.indexOf(' '))
    if(question !=="" && question.trim("")){

    sendMessage(JSON.stringify({"question":question,"language_model":"gpt-3.5"}))
      dispatch(userQuestion(question));
      dispatch(loading(true));
      setQuestion("");  
      setTimeout(()=>{
        const response = sample2;
        if (response) {
          dispatch(chatDetails(response));
        }
      },2000)
    };

    }

  return (
    <div className="flex justify-evenly items-center w-full h-1/2  ">
      <input
        id="input-field"
        value={question}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-[80%] h-[100%] border-1 rounded-[3rem] bg-darkBlue"
        placeholder="Transform Questions into Insights !"
      ></input>

      <button
        onClick={(e)=>handleSubmit(e)} style={{textAlign:"center"}}
        className="bg-cyanBlue w-[12%] h-[90%] rounded-[9999px] pl-[6px]"
       
      >
        <SendIcon sx={{ color: "white",width:"50%" }} />
      </button>
      {/* <button className="bg-blue-300 h-6 text-[10px]" onClick={(e)=>handleSubmit(e)} name="gpt3">GPT-3 </button>
      <button  className="bg-blue-300 h-6 text-[10px]" onClick={(e)=>handleSubmit(e)} name = "gpt3.5">GPT-3.5 </button> */}

    </div>
  );
};

export default ChatFooter;
