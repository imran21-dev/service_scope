import axios from "axios";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../provider/ContextApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "https://service-scope-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(ThemeContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Failed !",
                text: `${error}`,
                confirmButtonText: "Retry",
                scrollbarPadding: false,
                customClass: {
                  title: "text-xl md:text-3xl font-bold ",
                  text: "text-3xl",
                  popup: "bg-white text-black rounded-3xl ",
                  confirmButton:
                    "bg-[#f12804] rounded-full py-[10px] px-[30px]",
                },
              });
            });
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  return axiosInstance;
};

export default useAxiosSecure;
