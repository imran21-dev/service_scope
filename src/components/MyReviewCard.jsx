import { Rating } from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";


import { FaLocationArrow } from "react-icons/fa";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import fakeThumb from '../assets/fakeThumb.jpg'
import useAxiosSecure from "../hooks/useAxiosSecure";


const MyReviewCard = ({ review, setDemoLoad, demoLoad,handleUpdate,setLoadData }) => {
  const {
    postedDate,
    ratingStar,
    serviceId,
    serviceLogo,
    serviceName,
    text,
    _id,
    edited
  } = review;

  
  const axiosSecure = useAxiosSecure()
  const formattedDate = moment(postedDate).format("MMMM Do YYYY, h:mm A");

  const handleDeleteReview = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f12804",
      cancelButtonColor: "#16A34A",
      confirmButtonText: "Yes, Delete it",
      customClass: {
        title: "text-xl  md:text-3xl font-bold ",
        text: "text-3xl ",
        popup: "text-black rounded-3xl ",
        confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
        cancelButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-review/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Review deleted Successfully!",
                confirmButtonText: "Okay",
                scrollbarPadding: false,
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  title: "text-xl  md:text-3xl font-bold ",
                  text: "text-3xl ",
                  popup: "text-black rounded-3xl outline outline-[#16A34A]",
                  confirmButton:
                    "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
                },
              });
              setDemoLoad(demoLoad + 1);
            }
          });
      }
    });
  };
  const handleImage = (e) => {
    e.target.src = fakeThumb
  }

  return (
    <div className="border rounded-2xl p-3 flex flex-col lg:flex-row justify-between ">
   
  



      <div className="flex  gap-3 lg:w-3/12">
        <img
          className="w-24 h-16 object-cover rounded-lg"
          onError={handleImage}
          src={serviceLogo}
          alt=""
        />
        <div>
          <h1 className="font-medium truncate pb-1">{serviceName}</h1>
          <Link
            to={`/service-details/${serviceId}`}
            className="bg-pColor/5 hover:bg-pColor py-1  px-2 flex items-center w-max gap-1 rounded-full text-xs text-pColor hover:text-white duration-200 font-medium border border-pColor"
          >
            Visit this service <FaLocationArrow />
          </Link>
        </div>
      </div>

      <div className="lg:w-8/12">
        <div className="flex items-center gap-1 pb-1">
          <Rating name="read-only" value={ratingStar} readOnly size="small" />
          <h2 className="text-sm">({ratingStar})</h2>
        </div>
        {edited && <h2 className="text-xs text-white font-medium bg-pColor  px-2 py-[1px] rounded-full w-max">Edited</h2>}
        <p className= "text-sm md:text-base">{text}</p>
        <h2 className="text-xs md:text-sm pt-2">Added on {formattedDate}</h2>
      </div>

      <div className="lg:w-1/12  text-right">
     
        <button onClick={() => {
          handleUpdate(_id)
          setLoadData(true)
          }} className="btn btn-ghost text-pColor hover:bg-pColor hover:text-white btn-xs"> 
          
            Edit</button>
            <button onClick={handleDeleteReview} className="btn btn-ghost text-red-500 hover:bg-red-500 hover:text-white btn-xs">Delete</button>

       
      </div>


    
    </div>
  );
};
MyReviewCard.propTypes = {
  review: PropTypes.object,
  setDemoLoad: PropTypes.func,
  demoLoad: PropTypes.number,
  handleUpdate : PropTypes.func,
  setLoadData : PropTypes.func,
};
export default MyReviewCard;
