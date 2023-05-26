import { useEffect, useState, useCallback, useRef } from "react";
import Navbar from "./components/Header/Navbar";
import ChatBody from "./components/Chat/ChatBody";
import { sample2, sample } from "./sample/sample.js";
import MainBody from "./components/Body/MainBody";
import GraphView from "./components/Body/GraphView";
import axios from "./utils/axiosInstance";
// import { msalApp } from "./auth/msalconfig";
import { useMsal } from "@azure/msal-react";
import { useSelector, useDispatch } from "react-redux";
import { chatDetails, loading, graphFlag, account } from "./redux/chatSlice";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import CircularProgress from '@mui/material/CircularProgress';
import LanguageModel from "./utils/LanguageModel";

let reconnected = false;
function App() {
  const dispatch = useDispatch();
  const isGraph = useSelector((state) => state.main.utility.isGraph);
  // const { accounts, instance } = useMsal();
  // dispatch(account(accounts));
  let accounts = ["hello"]
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [is_popup, set_is_popup] = useState(false);



  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `${import.meta.env.VITE_SOCKET_API_URL}?jwt_token=${JSON.parse(
            localStorage.getItem("jwt_token")
          )}&reconnect=${reconnected}`
        );
      }, 2000);
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt_token")) {
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };
    //   instance
    //     .acquireTokenSilent(accessTokenRequest)
    //     .then((accessTokenResponse) => {
    //       let idToken = accessTokenResponse.idToken;
    //       console.log(idToken);

    //       try {
    //         let authToken = axios.post("/token", {
    //           email: accounts[0].username,
    //         });
    //         authToken.then((res) => {
    //           console.log(res.data);
    //           localStorage.setItem("jwt_token", JSON.stringify(res.data));
    //         });
    //       } catch (err) {}
    //     });
    // } else {
    //   //  socketURL =`${import.meta.env.VITE_SOCKET_API_URL}?jwt_token=${localStorage.getItem("jwt_token")}`
    }

    // console.log(instance);
  }, []);

  const { sendMessage } = useWebSocket(getSocketUrl, {
    onOpen: () => {
      console.log("connected");
      setLoaderFlag(false);
    
    },
    onClose: () => {
      reconnected = true;
      console.log(reconnected);
    },
    shouldReconnect: (closeEvent) => true,
    onMessage: async (message) => {
      console.log(reconnected);
      if (message.data) {
        // const response = JSON.parse(message.data);
      
        dispatch(loading(false));
        const response = sample2;
        if (response) {
          dispatch(chatDetails(response));
        }
        if (response.charts?.length !== 0 && response.charts) {
          dispatch(graphFlag(true));
        }
      }
    },
  });

  return (
    <div>
      <div className="App" style={{ overflowY: "hidden", overflowX: "hidden" }}>
        <div className="w-screen h-screen ">
          <Navbar />
          {
            is_popup ?
            <LanguageModel set_is_popup = {set_is_popup}/>
            :
            <div className="bg-darkBlue w-screen h-screen  flex flex-row  overflowY-hidden">
              {loaderFlag ? (
                <div className="opacity-20 bg-white w-full h-[85%] flex flex-col justify-center items-center absolute overflowX-hidden overflowY-hidden">
                  <CircularProgress
                  sx={{width:"50",background:"white"}}
                  />
                </div>
              ) : (
                <ChatBody sendMessage={sendMessage} />
              )}
              {isGraph ? <GraphView /> : <MainBody loaderFlag={loaderFlag} />}
            </div>

          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
