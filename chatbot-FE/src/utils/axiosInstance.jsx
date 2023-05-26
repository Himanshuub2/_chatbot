
import axios from "axios"

const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_API_URL}`,
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("jwt_token")}`
    }
})

export default axiosInstance;