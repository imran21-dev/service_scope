import { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { FaEdit, FaPenNib } from "react-icons/fa";
import { IoMdArrowDropright, IoMdClose } from "react-icons/io";
import { MdCancel, MdDelete } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import ReviewRating from "../components/ReviewRating";
import { IoSendSharp } from "react-icons/io5";
import { ThemeContext } from "../provider/ContextApi";
import fakeUser from "../assets/fakeUser.webp";
import ReviewCart from "../components/ReviewCart";
import toast, { Toaster } from "react-hot-toast";
import ReviewSkeleton from "../components/ReviewSkeleton";
import RatingSummary from "../components/RatingSummary";
import fakeThumb from "../assets/fakeThumb.jpg";
import { ImSpinner9 } from "react-icons/im";
import { useLoadingBar } from "react-top-loading-bar";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { IconButton, Rating } from "@mui/material";
import { motion } from "motion/react";
import Up from "../components/Up";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useLoaderData();
  const [service, setService] = useState([]);
  const [write, setWrite] = useState(false);
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(false);
  const [demoLoad, setDemoLoad] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingService, setLoadingService] = useState(true);
  const skeletonCount = [1, 1, 1, 1];
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()


  const [serviceTitleD, setServiceTitle] = useState(null);
  const [serviceImageD, setServiceImage] = useState(null);
  const [companyNameD, setCompanyName] = useState(null);
  const [websiteD, setWebsite] = useState(null);
  const [priceD, setPrice] = useState(null);
  const [descriptionD, setDescription] = useState(null);
  const [categoryD, setCategory] = useState(null);



  useEffect(() => {
    start();
    setLoadingService(true);

    axiosSecure.get(`/single-service?id=${id}`).then((res) => {
      setLoadingService(false);
      setService(res.data);
      setServiceTitle(res.data.serviceTitle);
      setServiceImage(res.data.serviceImage);
      setCompanyName(res.data.companyName);
      setWebsite(res.data.website);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setCategory(res.data.category);
      complete();
    });
  }, [axiosSecure, complete, id, start, demoLoad]);

  const {
    addedDate,
    category,
    companyName,
    description,
    price,
    serviceImage,
    serviceTitle,
    publisherName,
    website,
    _id,
    userEmail,
  } = service;

  const handlePhoto = (e) => {
    e.target.src = fakeUser;
  };

  const handleWebsite = () => {
    window.open(`${website}`, "_blank", "noopener,noreferrer");
  };

  const handleReviewForm = () => {
    setWrite(!write);
  };

  const { user,setBlockScroll } = useContext(ThemeContext);
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  const currentUserEmail = user?.email;

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/all-reviews?id=${id}`).then((res) => {
      setLoading(false);
      setAllReviews(res.data);
    });
  }, [id, demoLoad, axiosSecure]);

  const [postLoad, setPostLoad] = useState(false);
  const handleFormReview = (e) => {
    e.preventDefault();
    setPostLoad(true);
    const form = e.target;
    const text = form.text.value;
    const postedDate = new Date();
    const postedDateString = new Date().toLocaleString("en-GB");

    if (rating === null) {
      setError(true);
      setPostLoad(false);

      return;
    }
    if (text.trim() === "") {
      setPostLoad(false);

      toast("Please write something", {
        icon: "😒",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }

    const review = {
      text,
      ratingStar: rating,
      userName,
      postedDate,
      userPhoto,
      serviceName: serviceTitle,
      serviceLogo: serviceImage,
      serviceId: _id,
      postedDateString,
      companyName,
      website,
      userEmail: currentUserEmail,
    };

    axiosSecure
      .post(`/add-review?email=${currentUserEmail}`, review)
      .then((res) => {
        if (res.data.insertedId) {
          setDemoLoad(demoLoad + 1);
          setPostLoad(false);

          toast("Review added!", {
            icon: "✅",
            style: {
              borderRadius: "100px",
              background: "#FA6500",
              color: "#fff",
            },
          });
        }
      });

    form.reset();
    setRating(null);
  };
  const handleImage = (e) => {
    e.target.src = fakeThumb;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want delete this service?",
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
            axiosSecure.delete(`/delete-service/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  icon: "success",
                  title: "Deleted!",
                  text: "Service deleted Successfully!",
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
               navigate('/services')
              }
            });
        }
      });
    
  
}


  const [isVisible, setIsVisible] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const handleUpdate = () => {
    setIsVisible(true)
    setBlockScroll(true)
  }


  const handleUpdateService = (e) => {
    e.preventDefault();
    setLoadings(true);
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const {
      serviceTitle,
      description,
      companyName,
      category,
      price,
      serviceImage,
      website,
    } = formData;

    if (serviceTitle.trim("") === "") {
      setLoadings(false);
      toast("Please add a Service Title", {
        icon: "😘",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }
    if (companyName.trim("") === "") {
      setLoadings(false);
      toast("Please add a Company", {
        icon: "😗",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }
    if (description.trim("") === "") {
      setLoadings(false);
      toast("Please add a Description", {
        icon: "😒",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return;
    }

    if (
      serviceTitle === serviceTitleD &&
      serviceImage === serviceImageD &&
      companyName === companyNameD &&
      website === websiteD &&
      price === priceD &&
      category === categoryD &&
      description === descriptionD
    ) {
      toast("Change something to update", {
        icon: "👇",
        style: {
          borderRadius: "100px",
          background: "#fff",
          color: "#000",
        },
      });
      setLoadings(false);
      return;
    }

    axiosSecure
      .patch(`/update-service/${id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Successfully updated service information",
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
          setLoadings(false);
          setIsVisible(false);
         setBlockScroll(false)
          setDemoLoad(demoLoad + 1);
         
        }
      });
  };

  const [ids, setIds] = useState(null);
  const [isVisibleReview, setIsVisibleReview] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [defaultRating, setDefaultRating] = useState(null);
  const [texts, setTexts] = useState(null);
  const [spinning, setSpinning] = useState(false)
  const [loadData, setLoadData] = useState(false)

  const updateReview = (id) => {
    setLoadData(true)
    axiosSecure.get(`/single-review?id=${id}`).then((res) => {
      setRatings(res.data.ratingStar);
      setDefaultRating(res.data.ratingStar);
      setTexts(res.data.text);
      setIds(res.data._id);
      setBlockScroll(true)
    setLoadData(false)
      
      setIsVisibleReview(true);
    });
  

  }

  const handleUpdateReviewData = (e) => {
    e.preventDefault();
    setSpinning(true);
    const newReviewText = e.target.text.value;
    const newReview = {
      newReviewText,
      ratings,
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

    if (newReviewText === texts && ratings === defaultRating) {
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
    if (ratings === null) {
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

    axiosSecure.patch(`/update-reviews/${ids}`, newReview)
      .then((res) => {
        if (res.data.modifiedCount) {
          setSpinning(false);
          setIsVisibleReview(false)
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
    <div className="lg:w-10/12 flex lg:flex-row flex-col lg:gap-6 gap-2 px-3 lg:px-0 w-full lg:mx-auto py-10 relative">
    
      <Helmet>
        <title>{`Service Details - ${_id} | Service Scope`}</title>
      </Helmet>
      {loadingService ? (
        <div className="lg:w-3/5 h-max grid xl:grid-cols-2 gap-3 lg:gap-7 ">
        
          <div className="skeleton h-64 w-full"></div>

          <div className="space-y-3 pt-1">
            <div className="skeleton h-5 w-3/4"></div>
            <div className="skeleton h-20 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-7 w-64"></div>
            <div className="skeleton h-5 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>

          <div>
            <div className="skeleton h-72 w-full mb-3"></div>
            <div className="skeleton h-20 w-full"></div>
          </div>

          <div className="skeleton h-28 w-full"></div>
        </div>
      ) : (
        <section className="lg:w-3/5 h-max grid xl:grid-cols-2 gap-3 lg:gap-7">
          
        <div>
      
        <img
            className="w-full h-64 object-cover rounded-xl lg:rounded-badge border-2 border-pColor/20"
            onError={handleImage}
            src={serviceImage}
            alt=""
          />
        </div>
          <div className="w-full relative">
            <h1 className="text-lg lg:text-2xl truncate w-11/12 font-bold pt-1">{serviceTitle}</h1>
            <p className="text-sm py-1 lg:text-base lg:py-2">{description}</p>
            <h2 className="font-medium lg:text-base text-sm">
              Total Reviews ({allReviews ? allReviews.length : "0"})
            </h2>
            <div className="flex items-center py-1 lg:py-2 gap-1">
              <h2 className="flex items-center lg:text-base text-sm font-medium">
                Category <IoMdArrowDropright />
              </h2>
              <h2 className="font-medium capitalize bg-pColor/5 text-pColor border border-pColor rounded-full lg:px-3 px-2 text-xs lg:text-sm py-[2px] lg:py-1 w-max">
                {category}
              </h2>
            </div>
            <h2 className="text-sm lg:text-lg font-semibold">Price: ${price}</h2>
            <h2 className="text-xs lg:text-sm font-medium py-1 lg:py-2">Added on : {addedDate}</h2>
            <h2 className="text-xs lg:text-sm font-medium flex items-center gap-1">
              Publisher : {publisherName ? publisherName : "Unavailable"}{" "}
              {currentUserEmail === userEmail && (
                <span className="bg-pColor text-xs py-[1px] text-white rounded-full px-2 flex w-max">
                  you
                </span>
              )}
            </h2>
            {currentUserEmail === userEmail && <div className="absolute flex top-0 right-0">
              <button onClick={handleUpdate} className="hover:text-pColor text-lg hover:bg-secondaryTextColor/5 flex items-end justify-center rounded-full p-1 duration-200 "><FaEdit /></button>
              <button onClick={handleDelete} className="hover:text-pColor text-lg hover:bg-secondaryTextColor/5 flex items-end justify-center rounded-full p-1 duration-200"><MdDelete /></button>
              </div>}
          </div>

          <div className="">
            <RatingSummary allReviews={allReviews}></RatingSummary>

            <div
              onClick={handleWebsite}
              className="border hover:bg-pColor/5 cursor-pointer w-full h-max border-pColor/20 p-4 lg:rounded-2xl rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="flex items-center lg:text-base text-sm gap-2 text-pColor font-medium">
                  <CiShare1 />
                  {companyName}
                </h2>
                <h3 className="text-xs lg:text-sm pt-1 text-secondaryTextColor/70">
                  Visit this website
                </h3>
              </div>
              <BsArrowRight className="lg:text-xl text-pColor" />
            </div>
          </div>

          <div className="w-full border h-max p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center pb-2 gap-2">
                <img
                  className="w-6 h-6 object-cover rounded-full"
                  onError={handlePhoto}
                  src={userPhoto}
                  alt=""
                />
                <h1
                  onClick={handleReviewForm}
                  className="text-pColor font-semibold lg:text-base text-sm cursor-pointer  flex items-center gap-1"
                >
                  {write ? "Cancel" : "Write a review"}
                  {write ? <MdCancel /> : <FaPenNib className="text-sm" />}
                </h1>
              </div>

              <ReviewRating
                rating={rating}
                setRating={setRating}
                error={error}
                setError={setError}
              ></ReviewRating>
            </div>

            <form onSubmit={handleFormReview}>
              <textarea
                required
                rows="10"
                name="text"
                className={`custom-scrollbar lg:text-base text-sm duration-150 resize-none  w-full outline-transparent  ${
                  write ? "lg:h-64 h-44" : "h-0 "
                }`}
                placeholder="Write your review here... Share your experience, thoughts, or feedback about the service!"
              ></textarea>
              {write && (
                <button className="btn rounded-full min-h-max h-max  text-xs md:text-[14px] py-2 lg:py-3 text-white bg-pColor">
                  {postLoad && <ImSpinner9 className="animate-spin" />} Add
                  Review <IoSendSharp />
                </button>
              )}
            </form>
          </div>
        </section>
      )}

      {loading ? (
        <div className="flex lg:w-2/5 flex-col  gap-2">
          {skeletonCount.map((skeleton, idx) => (
            <ReviewSkeleton key={idx}></ReviewSkeleton>
          ))}
        </div>
      ) : (
        <section className="lg:w-2/5 h-[750px]  custom-scrollbar  overflow-y-scroll">
          <div className="">
            {allReviews.length < 1 ? (
              <h2 className="text-lg w-full h-[750px] bg-gray-100/50 rounded-2xl font-medium flex justify-center items-center ">
                No reviews yet—your feedback could be the first to help others!
              </h2>
            ) : (
              <div className="flex flex-col gap-3 px-3">
                {allReviews.map((review) => (
                  <ReviewCart updateReview={updateReview} loadData={loadData} setDemoLoad={setDemoLoad} demoLoad={demoLoad} review={review} key={review._id}></ReviewCart>
                ))}
              </div>
            )}
          </div>
        </section>
      )}





      <Toaster position="top-center" reverseOrder={false} />
    </div>
{isVisible && (
        <div className="w-full h-screen bg-black/30  absolute flex items-center justify-center top-0 z-30 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            className="lg:w-3/5  border bg-white rounded-2xl lg:p-4 shadow-lg flex flex-col "
          >
            <div className="text-right pt-7 lg:pt-0 border-b ">
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

            <div className="lg:w-10/12 lg:px-0 px-3 pt-3 md:pt-10 mx-auto text-center">
              <h1 className="text-lg md:text-2xl font-bold">
                Update your Service Information
              </h1>
              <p className="py-1 text-secondaryTextColor/50 md:pb-5 text-sm md:text-base">
                Keep Your Service Up-to-Date
              </p>

              <form
                onSubmit={handleUpdateService}
                className="px-3 lg:px-0 xl:w-7/12 mx-auto pb-10"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="text-xs md:text-sm">Service Title</span>
                  </label>
                  <div className="border flex items-center rounded-xl ">
                    <input
                      defaultValue={serviceTitleD}
                      type="text"
                      name="serviceTitle"
                      placeholder="Service title"
                      className=" text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="text-xs md:text-sm">Service Image</span>
                  </label>
                  <div className="border flex items-center rounded-xl ">
                    <input
                      defaultValue={serviceImageD}
                      type="url"
                      name="serviceImage"
                      placeholder="Service image URL"
                      className=" text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <section className="grid grid-cols-2 gap-x-6 gap-y-1">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xs md:text-sm">Company Name</span>
                    </label>
                    <div className="border flex items-center rounded-xl ">
                      <input
                        defaultValue={companyNameD}
                        type="text"
                        name="companyName"
                        placeholder="Company name"
                        className=" text-sm w-full md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="text-xs md:text-sm">Website URL</span>
                    </label>
                    <div className="border flex items-center rounded-xl ">
                      <input
                        defaultValue={websiteD}
                        type="url"
                        name="website"
                        placeholder="Website URL"
                        className=" text-sm w-full md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="text-xs md:text-sm">Price</span>
                    </label>
                    <div className="border flex items-center rounded-xl ">
                      <input
                        defaultValue={priceD}
                        type="number"
                        name="price"
                        placeholder="Service price"
                        className=" text-sm w-full md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xs md:text-sm">Category</span>
                    </label>
                  <div className="text-sm md:text-base">
                    <Up
                      category={categoryD}
                    ></Up>

                  </div>
                  </div>
                </section>

                <div className="form-control">
                  <label className="label">
                    <span className="text-xs md:text-sm">Description</span>
                  </label>
                  <div className="border flex items-center rounded-xl ">
                    <textarea
                      defaultValue={descriptionD}
                      name="description"
                      rows="6"
                      required
                      placeholder="Write a description"
                      className="flex-1 text-sm md:text-base resize-none focus:outline-none py-2 px-3 bg-transparent"
                    ></textarea>
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button className="btn rounded-full text-xs md:text-[14px] py-3 min-h-max h-max bg-pColor border-none text-white hover:bg-pColor">
                    {loadings && <ImSpinner9 className="animate-spin" />} Update
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}



{isVisibleReview && (
        <div className="w-full h-screen bg-black/30  absolute  flex items-center justify-center top-0 z-30 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} // Start hidden
            animate={{ opacity: 1, scale: 1 }} // Animate to visible
            exit={{ opacity: 0, y: -50 }} // Exit animation
            transition={{ duration: 0.2 }}
            className="lg:w-3/5 w-11/12 border bg-white rounded-2xl lg:p-4 shadow-lg flex flex-col "
          >
            <div className="text-right border-b pb-3">
              <IconButton
                onClick={() => {
                  setIsVisibleReview(false)
                  setBlockScroll(false)
                }}
                aria-label="delete"
              >
                <IoMdClose />
              </IconButton>
            </div>

            <div className="lg:w-10/12 lg:px-0 px-3 pt-3  lg:mx-auto">
            <h1 className="text-lg md:text-2xl font-bold text-center pb-5">
              Update Review Information
            </h1>

            <form className="px-3 lg:px-0 xl:w-7/12 mx-auto pb-10" 
            onSubmit={handleUpdateReviewData}
            >
              <h2 className="font-medium py-1">Change rating star</h2>
              <div className="flex items-center gap-2">
                <Rating
                  onChange={(event, newValue) => {
                    setRatings(newValue);
                  }}
                  name="half-rating"
                  value={ratings}
                  precision={1}
                />
                <span>({ratings})</span>
              </div>

              <h2 className="font-medium md:text-base text-sm py-1">Change review </h2>
              <textarea
                name="text"
                placeholder={texts}
                defaultValue={texts}
                rows="10"
                className="border text-sm md:text-base w-full rounded-xl outline-transparent focus:outline-none resize-none p-3"
              ></textarea>

              <button className="btn bg-pColor text-xs md:text-[14px] w-full rounded-full border-none min-h-max h-max py-3 text-white mt-4 mb-4">
                {spinning && <ImSpinner9 className="animate-spin" />}
                Update
              </button>
            </form>

            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
};

export default ServiceDetails;
