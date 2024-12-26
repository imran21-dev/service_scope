
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ContextApi";
import MyServiceCart from "../components/MyServiceCart";
import { RxTriangleDown } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IconButton } from "@mui/material";
import { IoIosClose, IoMdClose } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";
import { motion } from "motion/react";
import UpdateCustomSelectorProps from "../components/UpdateCustomSelectorProps";
import { PulseLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

import { useLoadingBar, } from "react-top-loading-bar";
import noData from '../assets/noresult.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";


const MyServices = () => {
  const { user, setBlockScroll } = useContext(ThemeContext);
  const email = user?.email;
  const [myServices, setMyServices] = useState([]);
  const [demoLoad, setDemoLoad] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const [cross, setCross] = useState(false)
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });
  const axiosSecure = useAxiosSecure()
  
  useEffect(() => {
    start()
    setCross(false)
    setSpinning(true)

   
    axiosSecure.get(`/my-services?email=${email}`)
      .then((res) => {
        setMyServices(res.data);
        complete()
        setSpinning(false)
      });
  }, [email, demoLoad, start, complete, axiosSecure]);

  const [serviceTitleD, setServiceTitle] = useState(null);
  const [serviceImageD, setServiceImage] = useState(null);
  const [companyNameD, setCompanyName] = useState(null);
  const [websiteD, setWebsite] = useState(null);
  const [priceD, setPrice] = useState(null);
  const [descriptionD, setDescription] = useState(null);
  const [categoryD, setCategory] = useState(null);

  const [id, setId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
 
  const [loading, setLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  


  const handleUpdate = (id) => {
    setDataLoad(true);
    
    axiosSecure.get(`/single-service?id=${id}`).then((res) => {
      setId(res.data._id);

      setServiceTitle(res.data.serviceTitle);
      setServiceImage(res.data.serviceImage);
      setCompanyName(res.data.companyName);
      setWebsite(res.data.website);
      setPrice(res.data.price);
      setDescription(res.data.description);
      setCategory(res.data.category);
      setBlockScroll(true)
      setDataLoad(false);
      setIsVisible(true);
      
      
    });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
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
      setLoading(false);
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
      setLoading(false);
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
      setLoading(false);
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
          setLoading(false);
          setIsVisible(false);
      setBlockScroll(false)
      setCross(false)

          setDemoLoad(demoLoad + 1);
         
        }
      });
  };


  const [searchResult, setSearchResult] = useState(false)
  const handleSearch = (e) => {
    e.preventDefault()
    const keyword = e.target.keyword.value
    if (keyword.trim("") === "") {
      return
    }
    
    start()
    setSearchResult(true)
    axiosSecure.get(`/search-my-services/?email=${email}&keyword=${keyword}`)
    .then(res => {
      setSearchResult(false)
      complete()
      setMyServices(res.data)
      setCross(true)
    })
    
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
  <div className="min-h-screen flex flex-col items-center justify-start">
    <>
     <Helmet>
                  <title>My Services | Service Scope</title>
                </Helmet>
    {
     spinning ? 
        <div className="md:w-10/12 w-full px-3 md:mx-auto py-10 relative h-max">
          <div className="flex items-center lg:flex-row gap-2 flex-col justify-between">
          <div className="skeleton h-6 w-44"></div>
          <div className="skeleton h-12 rounded-full w-64 lg:w-96"></div>
          </div>
          <div className="skeleton lg:block hidden h-12 rounded-2xl mt-5 mb-3 w-full"></div>

        <div className="space-y-1 pt-2">
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          </div>
        </div>
     
     :
      <div className="md:w-10/12 mx-auto py-10 relative h-max">
        <div className="flex flex-col gap-2 lg:flex-row items-center justify-between">
          <h1 className="md:w-3/12 text-xl font-semibold">My Services {myServices.length}</h1>

          {dataLoad && <PulseLoader size={10} color="#FA6500" />}

          
          <div className="xl:w-3/12 flex items-center gap-2 relative">
        
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
                className="focus:outline-none text-sm md:text-base bg-transparent px-1 py-2 w-full"
                placeholder="Search..."
                type="text"
              />
              <button className="text-xs md:text-sm font-medium h-10 hover:px-7 duration-200 bg-pColor px-6 text-white">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="pt-5">
          <section className="w-full hidden bg-pColor/10 rounded-xl mb-1 text-pColor  py-3 lg:flex text-sm font-bold">
            <div className=" w-3/6 flex pl-6 gap-5">
              <h2 className="flex items-center">
                Logo <RxTriangleDown />
              </h2>
              <h2 className="flex items-center">
                Service Name & Description <RxTriangleDown />
              </h2>
            </div>
            <div className="w-1/6 pl-4 flex items-center">
              company
              <RxTriangleDown />
            </div>
            <div className="w-1/6 pl-4 flex items-center">
              category
              <RxTriangleDown />
            </div>
            <div className="flex-1 pl-4 flex items-center">
              price
              <RxTriangleDown />
            </div>
          </section>

            {
            searchResult ? 
          <div className="space-y-1 pt-2">
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          <div className="skeleton h-16 w-full"></div>
          </div> :
          <table className="table overflow-x-auto">
            <tbody>

            {
            myServices.length < 1 ? <div className=" flex items-center flex-col justify-center h-96">
              <Lottie loop={false} className="w-2/12" animationData={noData}></Lottie>
              <h1 className="font-medium">No result found</h1>
            </div> : 
            <>
               {myServices.map((service) => (
              <MyServiceCart
                service={service}
                setDemoLoad={setDemoLoad}
                demoLoad={demoLoad}
                handleUpdate={handleUpdate}
                dataLoad={dataLoad}
              
                key={service._id}
              ></MyServiceCart>
            ))}
            </>
            }

             
            </tbody>
          </table>
            }
         
        </div>
      </div>
    }







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
                        className=" text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
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
                        className=" text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
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
                        className=" text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-xs md:text-sm">Category</span>
                    </label>
                  <div className="text-sm md:text-base">
                    <UpdateCustomSelectorProps
                      category={categoryD}
                    ></UpdateCustomSelectorProps>

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
                    {loading && <ImSpinner9 className="animate-spin" />} Update
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>

  </div>

   
  );
};

export default MyServices;
