import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonCart from "../components/SkeletonCart";
import noData from '../assets/noresult.json'
import AllServiceCart from "../components/AllServiceCart";

import { RiCloseLargeFill, RiEqualizerFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useLoadingBar } from "react-top-loading-bar";
import FilterSelector from "../components/FilterSelector";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { IoIosClose } from "react-icons/io";


const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const featuredServicesSkeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const [sleketonTime, setSkeletonTime] = useState(true);
  const [cross, setCross] = useState(false)
  const [demoLoad, setDemoLoad] = useState(0)
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });
  const [selectedCategory, setSelectedCategory] = useState(null)
  const axiosSecure = useAxiosSecure()
  useEffect(() => {
    start()
    setSkeletonTime(true);
    setCross(false)
    document.querySelector('#searchInput').value = ''
    axios.get("https://service-scope-server.vercel.app/all-services").then((res) => {
      setAllServices(res.data);
      complete()
      setSkeletonTime(false);
    });
  }, [complete, demoLoad, start]);

  const [filterClose, setFilterClose] = useState(true)
  useEffect(()=> {
    if (!selectedCategory) {
      return
    }
    document.querySelector('#searchInput').value = ''
    setCross(false)
    start()
    setSkeletonTime(true)
    axiosSecure.get(`/filter-services?category=${selectedCategory.label}`)
    .then(res => {
      setAllServices(res.data)
      complete()
      setSkeletonTime(false)
      setFilterClose(false)
    })
  },[axiosSecure, complete, selectedCategory, start])

  const handleSearch = (e) => {
    e.preventDefault()
    const keyword = e.target.keyword.value
    if (keyword.trim("") === "") {
      return
    }
    setSelectedCategory(null)
    setFilterClose(true)
    start()
    setSkeletonTime(true)
    axiosSecure.get(`/search-services/?keyword=${keyword}`)
    .then(res => {
      setSkeletonTime(false)
      complete()
      setAllServices(res.data)
      setCross(true)
    })
    
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">

    <div className="md:w-10/12  w-full px-3 lg:px-0 md:mx-auto md:py-10 z-0 relative">
      <Helmet>
              <title>All Services | Service Scope</title>
            </Helmet>
      <div className="grid lg:grid-cols-3 gap-3 lg:gap-6 items-center relative ">
          <h1 className="text-lg md:text-xl font-semibold">All Services {allServices.length}</h1>

          

          
          <div className=" flex items-center gap-2 relative">
          
            <form onSubmit={handleSearch} className="border border-pColor/50 rounded-full items-center overflow-hidden flex w-full">
            {cross ?  <button className="" onClick={() => {
            setDemoLoad(demoLoad + 1)
            setCross(false)
            }}>
          <IoIosClose className="text-2xl md:text-3xl text-secondaryTextColor/50 ml-2" />
         </button> :
         <CiSearch className="text-2xl md:text-3xl text-secondaryTextColor/50 ml-3" />
         }
              <input
              name="keyword"
              id='searchInput'
                className="focus:outline-none text-sm md:text-base bg-transparent px-1 py-2 w-full"
                placeholder="Search..."
                type="text"
              />
              <button className="text-xs md:text-sm font-medium h-10 hover:px-7 duration-200 bg-pColor px-6 text-white">
                Search
              </button>
            </form>
          </div>
         <div className="w-full  flex justify-end">
          
         <div className="flex lg:w-2/4  items-center gap-1 border rounded-full">
         {
          filterClose ? 
          
            <RiEqualizerFill className="ml-3"/> 
          :
         <RiCloseLargeFill onClick={() => {
          setDemoLoad(demoLoad + 1)
          setSelectedCategory(null)
          setFilterClose(true)
         }} className="text-lg ml-3 cursor-pointer hover:text-pColor duration-200" />
         }
         <div className="w-full text-xs md:text-sm">
          <FilterSelector  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></FilterSelector>
          </div>
         </div>
         </div>
        </div>


      {sleketonTime ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6 gap-3  py-5">
          {featuredServicesSkeleton.map((skeleton, idx) => (
            <SkeletonCart key={idx}></SkeletonCart>
          ))}
        </div>
      ) : (
        allServices.length < 1 ? <div className="flex items-center flex-col justify-center h-screen w-full absolute -z-10 left-0 top-0">
          <Lottie loop={false} className="w-2/12" animationData={noData}></Lottie>
          <h1 className="font-medium">No result found</h1>
        </div> : 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6 gap-3  py-5">
        {allServices.map((service) => (
          <AllServiceCart service={service} key={service._id}></AllServiceCart>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Services;
