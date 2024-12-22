import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const TopReviewCart = ({ review }) => {
  const {
    ratingStar,
    serviceLogo,
    serviceName,
    serviceURL,
    text,
    userName,
    userPhoto,
  } = review;
  return (
    <div className="border rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-3 pt-3">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src="https://i.postimg.cc/cJHmNLn0/20240526-154725.jpg"
          alt=""
        />
        <section >
          <h1 className="font-medium text-sm">{userName}</h1>
          <Rating name="read-only" value={ratingStar} readOnly size="small" />
        </section>
      </div>
      <p className="line-clamp-4 px-3 py-1 h-20">{text}</p>
      <Link className="flex items-center gap-3 cursor-pointer  p-3 border-t hover:bg-secondaryTextColor/5">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWEuXAfCNkdxHLFCQpu3fWB2xqE0k4QXt0A&s"
          alt=""
        />
        <section >
          <h1 className="font-medium text-sm">{serviceName}</h1>
          <h2  className="text-sm line-clamp-1 ">webfixer23.com</h2>
        </section>
      </Link>
    </div>
  );
};

TopReviewCart.propTypes = {
    review: PropTypes.object
}
export default TopReviewCart;
