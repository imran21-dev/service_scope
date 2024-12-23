import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import fakeUser from '../assets/fakeUser.webp'
import { useEffect, useState } from "react";
import moment from "moment";

const TopReviewCart = ({ review }) => {
  const {
    ratingStar,
    serviceLogo,
    serviceName,
    text,
    userName,
    userPhoto,
    serviceId,
    postedDate
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
      console.error("Invalid posted date format.");
      setRelativeTime("Invalid date");
    }
  }, [postedDate]);

  return (
    <div className="border rounded-2xl overflow-hidden">
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
      <p className="line-clamp-4 px-3 py-1 h-20">{text}</p>
      <Link to={`/service-details/${serviceId}`} className="flex items-center gap-3 cursor-pointer  p-3 border-t hover:bg-secondaryTextColor/5">
        <img
          className="w-9 h-9 rounded-full object-cover"
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
