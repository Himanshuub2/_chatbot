import ChatFooter from "./ChatFooter";
import ChatView from "./ChatView";



const ChatBody = ({sendMessage}) => {
  return (
    <div className="bg-lightBlue w-[30%] h-[90%] mx-3 flex flex-col justify-center items-center mt-4   " style={{overflow:"hidden"}}>
      <div className="h-[85%] w-full rounded-sm scrollbar-thin scrollbar-track-lightBlue scrollbar-thumb-gray-300 scrollbar-rounded-md  " >
         <ChatView />
      </div>
      <div className="w-11/12 h-[15%] mb-16  flex items-center bg-[#295280] rounded-sm">
        <ChatFooter  sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatBody;
