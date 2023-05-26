import { Loader } from "../../utils/Loader";
import {  useRef, useEffect } from "react";
import TableResponse from "./TableResponse";
import { useSelector } from "react-redux";



const ChatMessage = ({ item, index }) => {
  const messageRef = useRef();
  const loading = useSelector(state=>state.main.utility.loaderr)
  const finalData = useSelector(state=>state.main.chat)
  
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });



  return item.side === "User" ? (             ///for user questions
    <>
      <div className="flex w-full flex-wrap justify-end mt-4 ">
        <div className=" message-right  bg-cyanBlue mr-2">
          <h1 className="w-5/6 self-end break-words " style={{fontSize:"1.1vw"}}>{item.response}</h1>
        </div>
      </div>
      <div />

      {
        <div ref={messageRef}>
          {loading && finalData.length === index + 1 ? (
            <Loader index={index} />
          ) : (
            ""
          )}
        </div>
      }
    </>
  ) : (
    <>
      {typeof item.response === "object" ? (
        <>
        {
          <TableResponse item={item} />
        }
        </>
      ) : (
        <>
          <div className="flex w-full  flex-wrap justify-start mt-4 h-full ">
            <h1 className="font-medium font-Bold-Mars text-cyanBlue mx-2" style={{fontSize:"1.1vw"}}>
              Martie
            </h1>
            <div className="message-left bg-lightGray w-content h-full ">
              <h1 className="ml-6 w-5/6  self-start break-normal mb-2 " style={{fontSize:"1.1vw"}}>
                {item.response}
              </h1>
            </div>
          </div>
          <div ref={messageRef}></div>
        </>
      )}
    </>
  );
};

export default ChatMessage;
