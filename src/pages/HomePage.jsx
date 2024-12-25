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

import { Helmet } from "react-helmet-async";


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

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className="">
      <Helmet>
        <title>Home | Service Scope</title>
      </Helmet>
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
       <div className="flex w-10/12 mx-auto justify-center font-['Exo 2']">

      
       
       <section className=" px-10  w-44 border-r  pb-5 flex-col flex items-center justify-between">
        

       <div >
        <h1 className="text-5xl bg-gradient-to-tl from-purple-500 to-pColor bg-clip-text text-transparent  font-extrabold"><CountUp start={0} end={allUser} ></CountUp></h1>
        <h1 className="uppercase font-semibold mt-1 bg-gradient-to-tl from-purple-500 to-pColor bg-clip-text text-transparent">Users</h1>
       </div>
       </section>

       <section className=" px-10 w-44 border-r pb-5 flex-col flex items-center justify-between">
        

       <div >
        <h1 className="text-5xl bg-gradient-to-tl from-purple-500 to-pColor bg-clip-text text-transparent  font-extrabold"><CountUp start={0} end={allServices} ></CountUp></h1>
        <h1 className="uppercase font-semibold mt-1 bg-gradient-to-tl from-purple-500 to-pColor bg-clip-text text-transparent">services</h1>
       </div>
       </section>

       <section className=" px-10 w-44  pb-5 flex-col flex items-center justify-between">
       

       <div >
        <h1 className="text-5xl bg-gradient-to-tl from-purple-500 to-pColor bg-clip-text text-transparent  font-extrabold"><CountUp start={0} end={allReviews} ></CountUp></h1>
        <h1 className="uppercase font-semibold mt-1 bg-gradient-to-tl from-purple-500 to-pColor bg-clip-text text-transparent">Reviews</h1>
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
