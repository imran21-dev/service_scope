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
import { motion } from "motion/react"
import { Helmet } from "react-helmet-async";
import cicle from '../assets/cicle.png'
import shape from '../assets/shape.png'
import plant from '../assets/plant.png'

const HomePage = () => {

  const [allServices, setAllservices] = useState(0)
  const [allReviews, setAllReviews] = useState(0)
  const [allUser, setAllUser] = useState(0)
  useEffect(()=>{
    axios.get('https://service-scope-server.vercel.app/all-services')
    .then(res => setAllservices(res.data.length))
    axios.get('https://service-scope-server.vercel.app/reviews-count')
    .then(res => setAllReviews(res.data.length))
    axios.get('https://service-scope-server.vercel.app/all-users')
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
      <section className="relative z-0 ">
        <img className="absolute z-10 w-32 md:w-52 lg:w-96 animate-spin-slow md:left-5 lg:left-3 left-3 md:-bottom-64 lg:-bottom-96 -bottom-48" src={cicle} alt="" />
        
        <div className=" absolute z-10 left-20 rotate-45 -top-10 md:-top-32 lg:-top-40">
        <img className="w-20 md:w-44 lg:w-72 animate-spin-slow3" src={plant} alt="" />
        </div>

        <div className=" origin-center right-3 md:right-32 -top-10 md:-top-40 absolute  z-10">
        <img className="w-20 md:w-64 animate-spin-slow2  " src={shape} alt="" />
        </div>
       
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
          className="mySwiper bg-pColor/10 "
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
       <section className="bg-pColor/10 pb-2">
       <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
       className="flex mx-auto justify-center font-['Exo 2']">

      
       
       <section className=" md:px-10  w-44 border-r border-[#753a88]/20  pb-5 flex-col flex items-center justify-between">
        

       <div >
        <h1 className="text-3xl md:text-5xl bg-gradient-to-tl from-[#753a88] to-[#cc2b5e] bg-clip-text text-transparent  font-extrabold"><CountUp start={0} end={allUser} ></CountUp></h1>
        <h1 className="uppercase md:text-base text-sm font-semibold mt-1 bg-gradient-to-tl from-[#753a88] to-[#cc2b5e] bg-clip-text text-transparent">Users</h1>
       </div>
       </section>

       <section className=" md:px-10 w-44 border-r border-[#753a88]/20 pb-5 flex-col flex items-center justify-between">
        

       <div >
        <h1 className="text-3xl md:text-5xl bg-gradient-to-tl from-[#753a88] to-[#cc2b5e] bg-clip-text text-transparent  font-extrabold"><CountUp start={0} end={allServices} ></CountUp></h1>
        <h1 className="uppercase md:text-base text-sm font-semibold mt-1 bg-gradient-to-tl from-[#753a88] to-[#cc2b5e] bg-clip-text text-transparent">services</h1>
       </div>
       </section>

       <section className=" md:px-10 w-44  pb-5 flex-col flex items-center justify-between">
       

       <div >
        <h1 className="text-3xl md:text-5xl bg-gradient-to-tl from-[#753a88] to-[#cc2b5e] bg-clip-text text-transparent  font-extrabold"><CountUp start={0} end={allReviews} ></CountUp></h1>
        <h1 className="uppercase md:text-base text-sm font-semibold mt-1 bg-gradient-to-tl from-[#753a88] to-[#cc2b5e] bg-clip-text text-transparent">Reviews</h1>
       </div>
       </section>
       
        </motion.div>  
        </section> 
      <FeaturedServices></FeaturedServices>
      <TopReviews></TopReviews>
      <MeetOurPartner></MeetOurPartner>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default HomePage;
