import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit'


const initialMSG1 = `Hello ! My name is Martie. `;
const initialMSG2 =
  "I am still new to Your Company, so at this time I can only answer questions on a limited number of subjects.";
const initialMSG3 =
  "If you ask a question that I am not familiar with, you may receive a response stating that I don't have an answer.I am always learning, so I will be able to answer additional questions in the coming weeks.";

const initialState = [
    { response: initialMSG1, side: "Assistant" },
    { response: initialMSG2, side: "Assistant" },
    { response: initialMSG3, side: "Assistant" },
  ]
const chatSlice = createSlice({
    name:"chat",
    initialState:initialState,
    reducers:{
        chatDetails:(state,action)=>{
            return state = [...state,{response:action.payload , side:"Assistant"}]
        },
        userQuestion : (state,action)=>{
          return state = [...state,{response:action.payload,side:"User"}]
        },
        
    }
})

const utilityState = {
  loaderr:false,
  isGraph:false,
  account:null,
}

const utilitySlice = createSlice({
  name:"utility",
  initialState:utilityState,
  reducers:{

    loading:(state,action)=>{
      console.log(action.payload)
      return state = {...state,loaderr:action.payload}
    },
    graphFlag:(state,action)=>{
      return state = {...state,isGraph:action.payload}

    },
    account:(state,action)=>{
      return state =action.payload;
    }
  }
})

export const {chatDetails,userQuestion}  = chatSlice.actions
export const {loading,graphFlag,account}  = utilitySlice.actions

export const mainReducer = combineReducers({
  chat:chatSlice.reducer,
  utility:utilitySlice.reducer
})
                                               
