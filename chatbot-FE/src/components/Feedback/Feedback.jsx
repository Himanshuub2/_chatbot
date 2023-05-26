import { useMsal } from "@azure/msal-react";
import axios from "../../utils/axiosInstance"
import { useState } from "react";
import { useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';

const Feedback = ({convoID,idx}) => {
  // const finalData = useSelector(state=>state.main.chat)
  const [thumbFlag,setThumbFlag] = useState(true)
  const [downThumbFlag,setDownThumbFlag] = useState(true)
  const [icon,setIcon] = useState(true)


  const { accounts } = useMsal();

  const handleFeedback = (flag,convoID) => {
    console.log(convoID)  
    if(flag===1){
    setThumbFlag(!thumbFlag)
    setIcon(!icon)
    }
    if(flag===0){
      setDownThumbFlag(!downThumbFlag)
    setIcon(!icon)

    }
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/feedback`, {
      flag: flag,
      username: accounts[0].username,
      conversationID: convoID,
    },{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("jwt_token")}`
      }
    });
  };

  return (
    <div className="flex flex-row w-full justify-end">
      {

        icon?
        <button
        onClick={() => {
          handleFeedback(1,convoID);
        }}
        name="good"
        className="mr-2"
      >
        <svg 
          stroke={thumbFlag ? "gray":"black"}
          fill={thumbFlag ? "none":"white"}
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          height="2em"
          width="1.2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
       
      
        
      </button>:
      <DoneIcon sx={{marginRight:"1rem",color:"gray"}}/>
      }
      {
        icon?

        <button
        onClick={() => {
          handleFeedback(0,convoID);
        }}
        name="bad"
        className="mr-6"
      >
       

          <svg 
          stroke={downThumbFlag ? "gray":"black"}
          fill={downThumbFlag ? "none":"white"}
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          height="2em"
          width="1.2em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
        </svg>
       
      </button>
      :""
      }
      
    </div>
  );
};

export default Feedback;
