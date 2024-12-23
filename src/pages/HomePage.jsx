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


const HomePage = () => {
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

      <FeaturedServices></FeaturedServices>
      <TopReviews></TopReviews>
      <MeetOurPartner></MeetOurPartner>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default HomePage;
