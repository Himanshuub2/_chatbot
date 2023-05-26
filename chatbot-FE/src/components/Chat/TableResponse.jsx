import {useEffect,useRef} from "react"
import Feedback from "../Feedback/Feedback";


 

const TableResponse = ({ item }) => {
  console.log(item,"table response data")
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  });
  return (
    <>
        {
          item.response.messages.map((msg,id)=>(
            <div className="flex w-full flex-wrap justify-start mt-4 " key = {id}>
            <h1 className=" font-medium font-Bold-Mars text-cyanBlue mx-2">
            Martie
          </h1>
          <div className="message-left bg-lightGray ">
            <h1 className="ml-6 w-5/6 self-start break-normal " style={{fontSize:"1.1vw"}}>
             {msg}
            </h1>
          </div>
            <Feedback  convoID = {item.response.id} idx = {id} />
          <div style ={{border:"0px solid black"}} ref={messageRef}></div>
          </div>            
          ))
        }
      


    
    </>
  );
};

export default TableResponse;
