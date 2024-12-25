import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";
import SkeletonCart from "./SkeletonCart";
import { useLoadingBar } from "react-top-loading-bar";
import { Link } from "react-router-dom";

const FeaturedServices = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const featuredServicesSkeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const [sleketonTime, setSkeletonTime] = useState(true)
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });

  useEffect(() => {
    start()
    setSkeletonTime(true)
    axios
      .get("https://service-scope-server.vercel.app/")
      .then((res) => {
        setFeaturedServices(res.data)
        setSkeletonTime(false)
        complete()
      });
  }, [complete, start]);

 

  return (
    <section className="bg-white relative">
      <div className="md:w-10/12 mx-3  md:mx-auto py-10">
      <h1 className="text-lg  md:text-xl font-semibold">Featured Services</h1>


      {
      sleketonTime ?  <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6 gap-3  py-5">
      {featuredServicesSkeleton.map((skeleton, idx) => (
        <SkeletonCart key={idx}></SkeletonCart>
      ))}
    </div> :
     <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6 gap-3  py-5">
     {featuredServices.map((service) => (
       <ServiceCart service={service} key={service._id}></ServiceCart>
     ))}
   </div>
      
      }

     <Link to='/services' className="btn text-xs md:text-sm rounded-full min-h-max h-max py-2 md:py-3 bg-pColor text-white md:px-8 border-none">Show all Services</Link>
      
     
    </div>
    </section>
  );
};

export default FeaturedServices;
