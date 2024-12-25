import axios from "axios";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../provider/ContextApi";
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})


const useAxiosSecure = () => {
    const {logOut} = useContext(ThemeContext)
    const navigate = useNavigate()
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.status === 401 || error.status === 403 ) {
                logOut()
                .then(() => {
                    console.log('log outed')
                    navigate('/login')
                })
                .catch((error) => {
                    console.log(error)
                })
            }
            return Promise.reject(error)
        }
    )
    },[logOut, navigate])
    return axiosInstance
};

export default useAxiosSecure;