import { IconButton, Rating } from "@mui/material";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";

import { FaLocationArrow } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyReviewCard = ({ review,setDemoLoad,demoLoad }) => {

  const { postedDate, ratingStar, serviceId, serviceLogo, serviceName, text, _id } =
    review;

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
        
        axios.delete(`http://localhost:5000/delete-review/${_id}`)
        .then(res => {
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
                      confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
                    },
                  });
                  setDemoLoad(demoLoad + 1)
            }
        })
          
           
         
      
      }
    });
   
  };

  return (
    <div className="border rounded-2xl p-3 flex justify-between ">
      <div className="flex gap-3 w-3/12">
        <img
          className="w-24 h-16 object-cover rounded-lg"
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

      <div className="w-8/12">
        <div className="flex items-center gap-1 pb-1">
          <Rating name="read-only" value={ratingStar} readOnly size="small" />
          <h2 className="text-sm">({ratingStar})</h2>
        </div>
        <p>{text}</p>
        <h2 className="text-sm pt-2">Added on {formattedDate}</h2>
      </div>

      <div className="w-1/12  text-right">
        <IconButton onClick={handleDeleteReview} color="error">
          <MdDelete />
        </IconButton>

        <IconButton color="warning">
          <MdModeEdit />
        </IconButton>
      </div>
    </div>
  );
};
MyReviewCard.propTypes = {
  review: PropTypes.object,
  setDemoLoad : PropTypes.func,
  demoLoad : PropTypes.number
};
export default MyReviewCard;
