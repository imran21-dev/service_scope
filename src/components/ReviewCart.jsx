import { Rating, Tooltip } from "@mui/material";
import moment from "moment/moment";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import fakeUser from "../assets/fakeUser.webp";
import fakeThumb from '../assets/fakeThumb.jpg'
import { ThemeContext } from "../provider/ContextApi";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { PulseLoader } from "react-spinners";

const ReviewCart = ({ review, setDemoLoad, demoLoad,updateReview,loadData }) => {
  const {
    postedDate,
    ratingStar,
    serviceLogo,
    text,
    userName,
    userPhoto,
    postedDateString,
    companyName,
    website,
    edited,
    userEmail,
    _id
  } = review;
  
  const {user} = useContext(ThemeContext)
  const currentEmail = user?.email
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const formattedDate = moment(postedDate);

    if (formattedDate.isValid()) {
      setRelativeTime(formattedDate.fromNow());
    } else {
      
      setRelativeTime("Invalid date");
    }
  }, [postedDate]);

  const handlePhoto = (e) => {
    e.target.src = fakeUser;
  };

  const handleVisitWebsite = () => {
    window.open(`${website}`, "_blank", "noopener,noreferrer");
  }
  const handleImage = (e) => {
    e.target.src = fakeThumb
  }

  const axiosSecure = useAxiosSecure()
  const handleDelete = () => {
    Swal.fire({
          title: "Are you sure?",
          text: "Do you want delete this review?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f12804",
          cancelButtonColor: "#16A34A",
          scrollbarPadding: false,
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

                  setDemoLoad(demoLoad + 1)
                 
                }
              });
          }
        });
  }


  return (
    <div className="border w-full rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-3 pt-3 pb-2 ">
        <img
          onError={handlePhoto}
          className="lg:w-9 lg:h-9 w-7 h-7 rounded-full object-cover"
          src={userPhoto}
          alt=""
        />
        <section className="flex-1">
          <h1 className="font-medium text-sm">{userName} {currentEmail === userEmail && <span>(You)</span>} </h1>
          <Rating
            name="read-only"
            precision={1}
            value={ratingStar}
            readOnly
            size="small"
          />
        </section>
        <Tooltip arrow placement="top" title={postedDateString}>
          <h2 className=" text-right text-xs lg:text-sm">{relativeTime}</h2>
        </Tooltip>
      </div>
      <hr className="mx-5" />
      <div className="flex items-center justify-between relative">
      {edited ? <h2 className="text-xs mx-3 mt-3 text-white font-medium bg-pColor  px-2 py-[1px] rounded-full w-max">Edited</h2> : <span></span>}
      {currentEmail === userEmail && <div className="flex items-center gap-1 text-secondaryTextColor/50 absolute top-[2px] right-2">
        {loadData && <PulseLoader size={5} color="#FA6500" />}
        <button onClick={() => updateReview(_id)} className="hover:bg-secondaryTextColor/5 duration-200 hover:text-pColor p-1 rounded-full"><MdEdit /></button>
        <button onClick={handleDelete} className="hover:bg-secondaryTextColor/5 duration-200 hover:text-pColor p-1 rounded-full "><MdDelete /></button>
        </div>}
      </div>
      <p className=" px-3 pt-6 pb-3 text-sm lg:text-base">{text}</p>
      <Link className="flex items-center gap-3 cursor-pointer py-2 px-3 border-t hover:bg-secondaryTextColor/5">
        <img
          className="lg:w-7 lg:h-7 w-6 h-6 border border-pColor rounded-full object-cover"
          onError={handleImage}
          src={serviceLogo}
          alt=""
        />
        <section onClick={handleVisitWebsite}>
          <h1 className="font-medium text-xs lg:text-sm">{companyName}</h1>
          <h2 className="text-xs lg:text-sm line-clamp-1 flex items-center gap-2">
            Visit website <BsArrowUpRight />
          </h2>
        </section>
      </Link>
    </div>
  );
};

ReviewCart.propTypes = {
  review: PropTypes.object,
  setDemoLoad : PropTypes.func,
  demoLoad : PropTypes.number,
  updateReview : PropTypes.func,
  loadData : PropTypes.bool,

};
export default ReviewCart;
