
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ContextApi";
import MyReviewCard from "../components/MyReviewCard";
import { motion } from "motion/react";
import { ImSpinner9 } from "react-icons/im";
import { IconButton, Rating } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useLoadingBar } from "react-top-loading-bar";
import Lottie from "lottie-react";
import noData from '../assets/noresult.json'
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { PulseLoader } from "react-spinners";

const MyReviews = () => {
  const { user, setBlockScroll } = useContext(ThemeContext);
  const userMail = user?.email;
  const [myReviews, setMyReviews] = useState([]);
  const [demoLoad, setDemoLoad] = useState(0);
  const [loading, setLoading] = useState(true)
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });
  const axiosSecure = useAxiosSecure()
  useEffect(() => {
    start()
    setLoading(true)
    axiosSecure.get(`/my-reviews?email=${userMail}`)
      .then((res) => {
        setMyReviews(res.data);
        setLoading(false)
        complete()
      });
  }, [userMail, demoLoad, start, complete, axiosSecure]);

  const [id, setId] = useState(null);
  const [rating, setRating] = useState(null);
  const [defaultRating, setDefaultRating] = useState(null);
  const [text, setText] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [loadData, setLoadData] = useState(false)

  const handleUpdate = (id) => {
    axiosSecure.get(`/single-review?id=${id}`).then((res) => {
      setRating(res.data.ratingStar);
      setDefaultRating(res.data.ratingStar);
      setText(res.data.text);
      setId(res.data._id);
      setBlockScroll(true)
      setLoadData(false)
      setIsVisible(true);
    });
  };

  const handleUpdateReviewData = (e) => {
    e.preventDefault();
    setSpinning(true);
    const newReviewText = e.target.text.value;
    const newReview = {
      newReviewText,
      rating,
    };

    if (newReviewText.trim("") === "") {
      toast("Invalid review text", {
        icon: "👀",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      setSpinning(false);

      return;
    }

    if (newReviewText === text && rating === defaultRating) {
      toast("Change something to update", {
        icon: "😘",
        style: {
          borderRadius: "100px",
          background: "#ffff",
          color: "#000",
        },
      });
      setSpinning(false);

      return;
    }
    if (rating === null) {
      toast("Please add rating star", {
        icon: "☹️",
        style: {
          borderRadius: "100px",
          background: "#ffff",
          color: "#000",
        },
      });
      setSpinning(false);

      return;
    }

    axiosSecure.patch(`/update-review/${id}`, newReview)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpinning(false);
          setIsVisible(false)
          setBlockScroll(false)
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Review information updated successfully!",
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
      });
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <>
     <Helmet>
                  <title>My Reviews | Service Scope</title>
                </Helmet>
      <div className="w-10/12 mx-auto py-10 relative">
        <div className="flex items-center justify-between">
        <h1 className="w-3/12 text-xl font-semibold">My Reviews</h1>
        {loadData && <PulseLoader size={10} color="#FA6500" />}
        <div className="w-3/12"></div>
        </div>
        {
        loading ?
        <div className="pt-4 space-y-3">
        
        <div className="skeleton h-28 w-full"></div>
        <div className="skeleton h-28 w-full"></div>
        <div className="skeleton h-28 w-full"></div>
        <div className="skeleton h-28 w-full"></div>
        <div className="skeleton h-28 w-full"></div>
        <div className="skeleton h-28 w-full"></div>
        </div>
        
        :

        myReviews.length < 1 ? <div className=" flex items-center flex-col justify-center h-96">
        <Lottie loop={false} className="w-2/12" animationData={noData}></Lottie>
        <h1 className="font-medium">No result found</h1>
      </div> 
      :

        <div className="space-y-3 pt-4">
          {myReviews.map((review) => (
            <MyReviewCard
              handleUpdate={handleUpdate}
              review={review}
              demoLoad={demoLoad}
              setDemoLoad={setDemoLoad}
              key={review._id}
              setLoadData={setLoadData}
            ></MyReviewCard>
          ))}
        </div>
        }


      </div>


      {isVisible && (
        <div className="w-full h-screen bg-black/30  absolute flex items-center justify-center top-0 z-30 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} // Start hidden
            animate={{ opacity: 1, scale: 1 }} // Animate to visible
            exit={{ opacity: 0, y: -50 }} // Exit animation
            transition={{ duration: 0.2 }}
            className="w-2/4  border bg-white rounded-2xl p-4 shadow-lg flex flex-col "
          >
            <div className="text-right border-b pb-3">
              <IconButton
                onClick={() => {
                  setIsVisible(false)
                  setBlockScroll(false)
                }}
                aria-label="delete"
              >
                <IoMdClose />
              </IconButton>
            </div>

            <h1 className="text-xl font-semibold py-3">
              Update Review Information
            </h1>

            <form onSubmit={handleUpdateReviewData}>
              <h2 className="font-medium py-1">Change rating star</h2>
              <div className="flex items-center gap-2">
                <Rating
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  name="half-rating"
                  value={rating}
                  precision={1}
                />
                <span>({rating})</span>
              </div>

              <h2 className="font-medium py-1">Change review </h2>
              <textarea
                name="text"
                placeholder={text}
                defaultValue={text}
                rows="10"
                className="border w-full rounded-xl outline-transparent focus:outline-none resize-none p-3"
              ></textarea>

              <button className="btn bg-pColor w-full rounded-full border-none min-h-max h-max py-3 text-white mt-4 mb-4">
                {spinning && <ImSpinner9 className="animate-spin" />}
                Update
              </button>
            </form>
          </motion.div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default MyReviews;
