import { Rating, Tooltip } from "@mui/material";
import moment from "moment/moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import fakeUser from "../assets/fakeUser.webp";

const ReviewCart = ({ review }) => {
  const {
    postedDate,
    ratingStar,
    serviceLogo,
    text,
    userName,
    userPhoto,
    postedDateString,
    companyName,
    website
  } = review;
  
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

  const handlePhoto = (e) => {
    e.target.src = fakeUser;
  };

  const handleVisitWebsite = () => {
    window.open(`${website}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="border w-full rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-3 pt-3 pb-2 ">
        <img
          onError={handlePhoto}
          className="w-9 h-9 rounded-full object-cover"
          src={userPhoto}
          alt=""
        />
        <section className="flex-1">
          <h1 className="font-medium text-sm">{userName}</h1>
          <Rating
            name="read-only"
            precision={1}
            value={ratingStar}
            readOnly
            size="small"
          />
        </section>
        <Tooltip arrow placement="top" title={postedDateString}>
          <h2 className=" text-right text-sm">{relativeTime}</h2>
        </Tooltip>
      </div>
      <hr className="mx-5" />
      <p className=" px-3 py-3  ">{text}</p>
      <Link className="flex items-center gap-3 cursor-pointer py-2 px-3 border-t hover:bg-secondaryTextColor/5">
        <img
          className="w-7 h-7 border border-pColor rounded-full object-cover"
          src={serviceLogo}
          alt=""
        />
        <section onClick={handleVisitWebsite}>
          <h1 className="font-medium text-sm">{companyName}</h1>
          <h2 className="text-sm line-clamp-1 flex items-center gap-2">
            Visit website <BsArrowUpRight />
          </h2>
        </section>
      </Link>
    </div>
  );
};
ReviewCart.propTypes = {
  review: PropTypes.object,
};
export default ReviewCart;
