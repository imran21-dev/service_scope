import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { FaPenNib } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import ReviewRating from "../components/ReviewRating";
import { IoSendSharp } from "react-icons/io5";
import { ThemeContext } from "../provider/ContextApi";
import fakeUser  from '../assets/fakeUser.webp'
import ReviewCart from "../components/ReviewCart";
import toast, { Toaster } from "react-hot-toast";
import ReviewSkeleton from "../components/ReviewSkeleton";
import RatingSummary from "../components/RatingSummary";


const ServiceDetails = () => {
  const { id } = useLoaderData();
  const [service, setService] = useState([]);
  const [write, setWrite] = useState(false);
  const [rating, setRating] = useState(null);
  const [error, setError] = useState(false);
  const [demoLoad, setDemoLoad] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true)
  const [loadingService, setLoadingService] = useState(true)
  const skeletonCount = [1,1,1,1]

  useEffect(() => {
    setLoadingService(true)
    axios
      .get(`http://localhost:5000/single-service?id=${id}`)
      .then((res) => {
        setLoadingService(false)
        setService(res.data)
      });
  }, [id]);

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
  } = service;


  const handlePhoto = (e) => {
    e.target.src = fakeUser
  }

  const handleWebsite = () => {
    window.open(`${website}`, "_blank", "noopener,noreferrer");
  };

  const handleReviewForm = () => {
    setWrite(!write);
  };

  const { user } = useContext(ThemeContext);
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  const userEmail = user?.email

  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5000/all-reviews?id=${id}`)
    .then(res => {
      setLoading(false)
      setAllReviews(res.data)
    })
  },[id, demoLoad])



  const handleFormReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.text.value;
    const postedDate = new Date();
    const postedDateString = new Date().toLocaleString('en-GB');

    if (rating === null) {
      setError(true);
      return;
    }
    if (text.trim() === "") {
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
      userEmail
    };

    axios.post("http://localhost:5000/add-review", review).then((res) => {
      if (res.data.insertedId) {
        setDemoLoad(demoLoad + 1)
        toast('Review added!',
          {
            icon: '✅',
            style: {
              borderRadius: '100px',
              background: '#FA6500',
              color: '#fff',
            },
          }
        );
      }
    });

  
    form.reset();
    setRating(null);
  };

  return (
    <div className="w-10/12 flex gap-6 mx-auto py-10 relative">

      {
       loadingService ? 
    <div className="w-3/5 h-max grid grid-cols-2 gap-4 ">

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



    </div> :

      <section className="w-3/5 h-max grid grid-cols-2 gap-7">
        <img
          className="w-full h-64 object-cover rounded-badge border-2 border-pColor/20"
          src={serviceImage}
          alt=""
        />
        <div className="w-full">
          <h1 className="text-2xl font-bold pt-1">{serviceTitle}</h1>
          <p className="py-2">{description}</p>
          <h2 className="font-medium">Total Reviews ({allReviews ? allReviews.length : '0'})</h2>
          <div className="flex items-center py-2 gap-1">
            <h2 className="flex items-center font-medium">
              Category <IoMdArrowDropright />
            </h2>
            <h2 className="font-medium capitalize bg-pColor/20 text-pColor border border-pColor rounded-full px-3 text-sm  py-1 w-max">
              {category}
            </h2>
          </div>
          <h2 className="text-lg font-semibold">Price: ${price}</h2>
          <h2 className="text-sm font-medium py-2">Added on : {addedDate}</h2>
          <h2 className="text-sm font-medium ">Publisher : {publisherName ? publisherName : 'Unavailable'}</h2>
        </div>
     
       <div>
         <RatingSummary allReviews={allReviews}></RatingSummary>

       <div
          onClick={handleWebsite}
          className="border hover:bg-pColor/5 cursor-pointer w-full h-max border-pColor/20 p-4 rounded-2xl flex items-center justify-between"
        >
          <div>
            <h2 className="flex items-center gap-2 text-pColor font-medium">
              <CiShare1 />
              {companyName}
            </h2>
            <h3 className="text-sm pt-1 text-secondaryTextColor/70">
              Visit this website
            </h3>
          </div>
          <BsArrowRight className="text-xl text-pColor" />
        </div>
       </div>

        
        <div className="w-full border h-max p-4 rounded-2xl">
          <div className="flex items-center justify-between">
           <div className="flex items-center pb-2 gap-2">
            <img className="w-6 h-6 object-cover rounded-full" onError={handlePhoto} src={userPhoto} alt="" />
           <h1
              onClick={handleReviewForm}
              className="text-pColor font-semibold cursor-pointer  flex items-center gap-1"
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
              className={`custom-scrollbar duration-150 resize-none  w-full outline-transparent  ${
                write ? "h-64" : "h-0 "
              }`}
              placeholder="Write your review here... Share your experience, thoughts, or feedback about the service!"
            ></textarea>
            {write && (
              <button className="btn rounded-full min-h-max h-max py-3 text-white bg-pColor">
                Add Review <IoSendSharp />
              </button>
            )}
          </form>
        </div>
    
       
      </section>

      }




       {
        loading ? <div className="flex w-2/5 flex-col  gap-2">
          {
          skeletonCount.map((skeleton, idx) => <ReviewSkeleton key={idx}></ReviewSkeleton>)
          
          }
        </div> : 
        <section className="w-2/5 h-[750px]  custom-scrollbar  overflow-y-scroll">
        <div className="">

        {
         allReviews.length < 1 ?<h2 className="text-lg w-full h-[750px] bg-gray-100/50 rounded-2xl font-medium flex justify-center items-center ">No reviews yet—your feedback could be the first to help others!</h2> : <div className="flex flex-col gap-3 px-3">
          {
          allReviews.map(review => <ReviewCart review={review} key={review._id}></ReviewCart>)
          }
         </div>
         }
        </div>
      </section>
       }

      


      <Toaster 
      position="top-center"
      reverseOrder={false}
      />
    </div>
  );
};

export default ServiceDetails;
