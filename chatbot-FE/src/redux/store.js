import { configureStore } from '@reduxjs/toolkit'
import {mainReducer} from "./chatSlice"


export const store = configureStore({
  reducer: {
    main:mainReducer
  },
})