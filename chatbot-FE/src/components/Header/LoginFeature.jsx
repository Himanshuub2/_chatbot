// import { useState } from "react";
// import axios from "axios";
// import { TextField ,styled} from "@mui/material";



// const InputField = styled(TextField)`
// & label.Mui-focused {
//   color: white;
// }
// & .MuiOutlinedInput-root {
//   &.Mui-focused fieldset {
//     border-color: white;
//     border:"none";
//   }
// }

// `


// const LoginFeature = () => {
    
//     const[username,setUsername] = useState("");
//     const[result,setResult] = useState("");

//     const [flag,setFlag] = useState(false);
//     const [inputFlag,setInputFlag] = useState(true);

//     const emailSubmit = async(e)=>{
//         setUsername(e.target.value)
    
//         const result=  await axios.post("http://localhost:8000/user",JSON.stringify({
//             username
//         }))

//         setResult(result.data);
//         setFlag(true);

 
//     }
//     // console.log(result);
//     // const ShowUser = ()=>{

//     //     switch(result){
//     //         case "No Result Found":
//     //             {console.log(result)}
//     //             <p className = "text-red-500 block">Hello evferydsafsf</p>
//     //         case !null:
//     //             <h4 className="font-medium text-cyanBlue text-m">Sree Harsha Alagani</h4>
//     //         // default:
//     //         //     null;
//     //     }

//     const ShowUser = ()=>{

//         if(result ==="No User Found"){
//          return  <p className = "text-red-500 block">Enter Valid User</p>

//         }
//         else if(result ===""){
//             return null;
//         }
//         else{
//             setInputFlag(false);
//             return <h4 className="font-medium text-cyanBlue text-m">{result}</h4>;
//         }
//     }

    
//   return (
//     <div className="flex flex-col justify-end items-center ">
//         {
           
//             inputFlag &&
            
// <InputField id="outlined-basic" variant="outlined" placeholder="Enter Email" size="small"
// onChange={(e) => setUsername(e.target.value)}
// onKeyPress={(e) => {
//   if (e.key === "Enter") {
//     emailSubmit(e);
//   }
// }}
// style={{
//   backgroundColor: "#04274e",
//   borderRadius: "25px",
//   width: "80%",
//   height: "20%",
//   borderColor: "white",
// }}
// InputProps={{
//   style: {
//     color: "white",
//     borderRadius: "25px",
//   },
// }}
// InputLabelProps={{
//   shrink: false,
//   style: {
//     color: "#BBB9B9",
//   },
// }}
// />
//         }
   
    

//         {
//             flag &&
//             <ShowUser/>
//         }


    


//     </div>
//   );
// };


// export default LoginFeature;