
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";



const ChatView = () => {
  const finalData = useSelector(state=>state.main.chat)

  
  return (
    <div >
{   finalData!==undefined?
    finalData?.map((item,i)=>(
    <ChatMessage  item={item} key={i} index = {i} />
    
))
:""
}
    </div>
  
                
  );
};

export default ChatView;
