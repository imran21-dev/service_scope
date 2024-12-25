import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../components/slider.css";
import Slide1 from "../components/Slide1";
import Slide2 from "../components/Slide2";
import Slide3 from "../components/Slide3";
import FeaturedServices from "../components/FeaturedServices";
import MeetOurPartner from "../components/MeetOurPartner";
import NewsLetter from "../components/NewsLetter";
import TopReviews from "../components/TopReviews";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import axios from "axios";
import reviews from '../assets/reviews.json'
import Lottie from "lottie-react";
import services from '../assets/service.json'
import users from '../assets/users.json'


const HomePage = () => {

  const [allServices, setAllservices] = useState(0)
  const [allReviews, setAllReviews] = useState(0)
  const [allUser, setAllUser] = useState(0)
  useEffect(()=>{
    axios.get('http://localhost:5000/all-services')
    .then(res => setAllservices(res.data.length))
    axios.get('http://localhost:5000/reviews-count')
    .then(res => setAllReviews(res.data.length))
    axios.get('http://localhost:5000/all-users')
    .then(res => setAllUser(res.data.length))
  },[])

  return (
    <div className="">
      <section className="relative z-0">
       
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Slide1></Slide1>
          </SwiperSlide>

          <SwiperSlide>
            <Slide2></Slide2>
          </SwiperSlide>

          <SwiperSlide>
            <Slide3></Slide3>
          </SwiperSlide>
        </Swiper>
        
      </section>
       <div className="flex w-10/12 mx-auto ">

      
       
       <section className="text-pColor px-10 w-44 border-r  pb-5 flex-col flex items-center justify-between">
        <Lottie className="w-28" animationData={users}></Lottie>

       <div className=" flex-col flex items-center justify-center ">
        <h1 className="text-3xl  font-extrabold"><CountUp start={0} end={allUser} ></CountUp></h1>
        <h1 className="uppercase font-semibold mt-1">Users</h1>
       </div>
       </section>

       <section className="text-pColor px-10 w-44 border-r pb-5 flex-col flex items-center justify-between">
        <Lottie className="w-28" animationData={services}></Lottie>

       <div className=" flex-col flex items-center justify-center ">
        <h1 className="text-3xl  font-extrabold"><CountUp start={0} end={allServices} ></CountUp></h1>
        <h1 className="uppercase font-semibold mt-1">services</h1>
       </div>
       </section>

       <section className="text-pColor px-10 w-44  pb-5 flex-col flex items-center justify-between">
        <Lottie className="w-28" animationData={reviews}></Lottie>

       <div className=" flex-col flex items-center justify-center ">
        <h1 className="text-3xl  font-extrabold"><CountUp start={0} end={allReviews} ></CountUp></h1>
        <h1 className="uppercase font-semibold mt-1">Reviews</h1>
       </div>
       </section>
       
        </div>   
      <FeaturedServices></FeaturedServices>
      <TopReviews></TopReviews>
      <MeetOurPartner></MeetOurPartner>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default HomePage;
