import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonCart from "../components/SkeletonCart";
import noData from '../assets/noresult.json'
import AllServiceCart from "../components/AllServiceCart";
import { IconButton } from "@mui/material";
import { RiCloseLargeFill, RiEqualizerFill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useLoadingBar } from "react-top-loading-bar";
import FilterSelector from "../components/FilterSelector";
import Lottie from "lottie-react";


const Services = () => {
  const [allServices, setAllServices] = useState([]);
  const featuredServicesSkeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const [sleketonTime, setSkeletonTime] = useState(true);
  const [cross, setCross] = useState(false)
  const [demoLoad, setDemoLoad] = useState(0)
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    start()
    setSkeletonTime(true);
    setCross(false)
    document.querySelector('#searchInput').value = ''
    axios.get("http://localhost:5000/all-services").then((res) => {
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
    axios.get(`http://localhost:5000/filter-services?category=${selectedCategory.label}`)
    .then(res => {
      setAllServices(res.data)
      complete()
      setSkeletonTime(false)
      setFilterClose(false)
    })
  },[complete, selectedCategory, start])

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
    axios.get(`http://localhost:5000/search-services/?keyword=${keyword}`)
    .then(res => {
      setSkeletonTime(false)
      complete()
      setAllServices(res.data)
      setCross(true)
    })
    
  }

  return (
    <div className="w-10/12 mx-auto py-10 z-0 relative">
      
      <div className="grid grid-cols-3 gap-6 items-center relative ">
          <h1 className=" text-xl font-semibold">All Services {allServices.length}</h1>

          

          
          <div className=" flex items-center gap-2 relative">
          {cross &&  <IconButton className="!absolute -left-10" onClick={() => {
            setDemoLoad(demoLoad + 1)
            setCross(false)
            }}>
          <RiCloseLargeFill className="text-lg" />
         </IconButton>}
            <form onSubmit={handleSearch} className="border border-pColor/50 rounded-full items-center overflow-hidden flex w-full">
              <CiSearch className="text-3xl text-secondaryTextColor/50 ml-3" />
              <input
              name="keyword"
              id='searchInput'
                className="focus:outline-none bg-transparent px-1 py-2 w-full"
                placeholder="Search..."
                type="text"
              />
              <button className="text-sm font-medium h-10 hover:px-7 duration-200 bg-pColor px-6 text-white">
                Search
              </button>
            </form>
          </div>
         <div className="w-full  flex justify-end">
          
         <div className="flex w-2/4  items-center gap-1 border rounded-full">
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
         <div className="w-full ">
          <FilterSelector  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></FilterSelector>
          </div>
         </div>
         </div>
        </div>
      {sleketonTime ? (
        <div className="grid grid-cols-4 gap-6  py-5">
          {featuredServicesSkeleton.map((skeleton, idx) => (
            <SkeletonCart key={idx}></SkeletonCart>
          ))}
        </div>
      ) : (
        allServices.length < 1 ? <div className="flex items-center flex-col justify-center h-screen w-full absolute -z-10 left-0 top-0">
          <Lottie loop={false} className="w-2/12" animationData={noData}></Lottie>
          <h1 className="font-medium">No result found</h1>
        </div> : <div className="grid grid-cols-4 gap-6  py-5">
        {allServices.map((service) => (
          <AllServiceCart service={service} key={service._id}></AllServiceCart>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;