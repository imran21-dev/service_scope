import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import fakeUser from '../assets/fakeUser.webp'
import { useEffect, useState } from "react";
import moment from "moment";
import fakeThumb from '../assets/fakeThumb.jpg'

const TopReviewCart = ({ review }) => {
  const {
    ratingStar,
    serviceLogo,
    serviceName,
    text,
    userName,
    userPhoto,
    serviceId,
    postedDate,
    edited
  } = review;
  
  const handlePhoto = (e) => {
    e.target.src = fakeUser
  }
 const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const formattedDate = moment(postedDate);

    if (formattedDate.isValid()) {
      setRelativeTime(formattedDate.fromNow());
    } else {
      
      setRelativeTime("Invalid date");
    }
  }, [postedDate]);
  const handleImage = (e) => {
    e.target.src = fakeThumb
  }
  return (
    <div className="border rounded-2xl flex flex-col justify-between overflow-hidden">
      <div className="flex items-center gap-3 px-3 pt-3">
        <img
         onError={handlePhoto}
          className="w-9 h-9 rounded-full object-cover"
          src={userPhoto}
          alt=""
        />
        <section >
          <h1 className="font-medium text-sm">{userName}</h1>
          <Rating name="read-only" value={ratingStar} readOnly size="small" />
        </section>
        <h2 className="text-xs flex-1 text-right text-secondaryTextColor/60">{relativeTime}</h2>
      </div>
      {edited && <h2 className="text-xs mx-3 mt-1 text-white font-medium bg-pColor  px-2 py-[1px] rounded-full w-max">Edited</h2> }
      
      <p className="line-clamp-4 px-3 py-1 h-20">{text}</p>
      <Link to={`/service-details/${serviceId}`} className="flex items-center gap-3 cursor-pointer  p-3 border-t hover:bg-secondaryTextColor/5">
        <img
          className="w-9 h-9 rounded-full object-cover"
          onError={handleImage}
          src={serviceLogo}
          alt=""
        />
        <section >
          <h1 className="font-medium text-sm">{serviceName}</h1>
          <h2  className="text-sm line-clamp-1 flex items-center gap-2">Explore this service <GoArrowRight /></h2>
        </section>
      </Link>
    </div>
  );
};

TopReviewCart.propTypes = {
    review: PropTypes.object
}
export default TopReviewCart;
