import marsLogoDark from "../../assets/marsLogoDark.png";
import {styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useMsal } from "@azure/msal-react";
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';

// import LoginFeature from "./LoginFeature";


const UserInitial = styled("h4")`
color:white;
font-size:1.2rem;
font-weight:700;
background-color:#23d7b9;
border-radius:50%;
padding:0.3rem;
`




const Navbar = () => {

        const {accounts,instance}=useMsal()
        const initialsArray = "K, Himanshu (Contractor)".split(" ");
        const {firstInitial,secondInitial} = {firstInitial:initialsArray[0][0],secondInitial:initialsArray[1][0]}
        async function signOutClickHandler(instance) {
            localStorage.removeItem("jwt_token")
            const logoutRequest = {
                account: instance.getAccountByHomeId(import.meta.env.VITE_SOCKET_API_URL),
            }
            await instance.logoutRedirect(logoutRequest)
          }
   
    return (
        <>
            <nav className="bg-darkestBlue w-screen h-[15%] border-b border-fontGray ">
                <div className="flex flex-row items-center h-full ">
                    <h4 className="font-ExtraBold-Mars text-cyanBlue  ml-4" style={{fontSize:"4.5vmin"}}>Company</h4>
                    <img src={marsLogoDark} alt="Mars Logo" style={{width:"8vmin",height:"7vmin"}}></img>
                    <h4 className="font-ExtraBold-Mars text-cyanBlue  ml-1" style={{fontSize:"3.6vmin"}}> ASSISTANT</h4>
                    <div className="flex flex-row gap-2 items-center ml-auto mr-5">
                        <h4 className="font-medium text-cyanBlue text-m" style={{fontSize:"2.5vmin"}}>{"Hey Himanshu"}</h4>
                      
                       
                        <UserInitial style={{fontSize:"3.2vmin"}}>{secondInitial}{firstInitial}</UserInitial>
                        <LogoutIcon sx={{color:"white",cursor:"pointer",fontSize:"5vmin"}} onClick = {()=>signOutClickHandler(instance)}></LogoutIcon>

                        {/* <IconButton>
                        <Brightness7Icon style={{color: "#FFFFFF",width:"35px",height:"35px"}}/>
                        </IconButton> */}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;