import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ContextApi";
import MyServiceCart from "../components/MyServiceCart";
import { RxTriangleDown } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";
import { motion } from "motion/react";
import UpdateCustomSelectorProps from "../components/UpdateCustomSelectorProps";
import { PulseLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { RiCloseLargeFill } from "react-icons/ri";
import { useLoadingBar, } from "react-top-loading-bar";
import noData from '../assets/noresult.json'
import Lottie from "lottie-react";


const MyServices = () => {
  const { user, setBlockScroll } = useContext(ThemeContext);
  const email = user?.email;
  const [myServices, setMyServices] = useState([]);
  const [demoLoad, setDemoLoad] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const [cross, setCross] = useState(false)
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });

  useEffect(() => {
    start()
    setCross(false)
    setSpinning(true)
    axios
      .get(`http://localhost:5000/my-services?email=${email}`)
      .then((res) => {
        setMyServices(res.data);
        complete()
        setSpinning(false)
      });
  }, [email, demoLoad, start, complete]);

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
    
    axios.get(`http://localhost:5000/single-service?id=${id}`).then((res) => {
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

    axios
      .patch(`http://localhost:5000/update-service/${id}`, formData)
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
    axios.get(`http://localhost:5000/search-my-services/?email=${email}&keyword=${keyword}`)
    .then(res => {
      setSearchResult(false)
      complete()
      setMyServices(res.data)
      setCross(true)
    })
    
  }

  return (
  

    <>
    {
     spinning ? 
        <div className="w-10/12 mx-auto py-10 relative h-max">
          <div className="flex items-center justify-between">
          <div className="skeleton h-6 w-44"></div>
          <div className="skeleton h-12 rounded-full w-96"></div>
          </div>
          <div className="skeleton h-12 rounded-2xl mt-5 mb-3 w-full"></div>

        <div className="space-y-1">
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
      <div className="w-10/12 mx-auto py-10 relative h-max">
        <div className="flex items-center justify-between">
          <h1 className="w-3/12 text-xl font-semibold">My Services {myServices.length}</h1>

          {dataLoad && <PulseLoader size={10} color="#FA6500" />}

          
          <div className="w-3/12 flex items-center gap-2 relative">
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
                className="focus:outline-none bg-transparent px-1 py-2 w-full"
                placeholder="Search..."
                type="text"
              />
              <button className="text-sm font-medium h-10 hover:px-7 duration-200 bg-pColor px-6 text-white">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="pt-5">
          <section className="w-full bg-pColor/10 rounded-xl mb-1 text-pColor  py-3 flex text-sm font-bold">
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
          <table className="table">
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
            initial={{ opacity: 0, scale: 0.5 }} // Start hidden
            animate={{ opacity: 1, scale: 1 }} // Animate to visible
            exit={{ opacity: 0, y: -50 }} // Exit animation
            transition={{ duration: 0.2 }}
            className="w-3/5  border bg-white rounded-2xl p-4 shadow-lg flex flex-col "
          >
            <div className="text-right border-b ">
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

            <div className="w-10/12 mx-auto py-10 text-center">
              <h1 className="text-xl font-semibold">
                Update your Service Information
              </h1>
              <p className="py-1 text-secondaryTextColor/50">
                Keep Your Service Up-to-Date
              </p>

              <form
                onSubmit={handleUpdateService}
                className="card-body w-full mx-auto"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Title</span>
                  </label>
                  <div className="border flex items-center rounded-xl ">
                    <input
                      defaultValue={serviceTitleD}
                      type="text"
                      name="serviceTitle"
                      placeholder="Service title"
                      className=" flex-1 focus:outline-none py-2 px-3 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Service Image</span>
                  </label>
                  <div className="border flex items-center rounded-xl ">
                    <input
                      defaultValue={serviceImageD}
                      type="url"
                      name="serviceImage"
                      placeholder="Service image URL"
                      className=" flex-1 focus:outline-none py-2 px-3 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <section className="grid grid-cols-2 gap-x-6 gap-y-1">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Company Name</span>
                    </label>
                    <div className="border flex items-center rounded-xl ">
                      <input
                        defaultValue={companyNameD}
                        type="text"
                        name="companyName"
                        placeholder="Company name"
                        className=" flex-1 focus:outline-none py-2 px-3 bg-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Website URL</span>
                    </label>
                    <div className="border flex items-center rounded-xl ">
                      <input
                        defaultValue={websiteD}
                        type="url"
                        name="website"
                        placeholder="Website URL"
                        className=" flex-1 focus:outline-none py-2 px-3 bg-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <div className="border flex items-center rounded-xl ">
                      <input
                        defaultValue={priceD}
                        type="number"
                        name="price"
                        placeholder="Service price"
                        className=" flex-1 focus:outline-none py-2 px-3 bg-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Category</span>
                    </label>

                    <UpdateCustomSelectorProps
                      category={categoryD}
                    ></UpdateCustomSelectorProps>
                  </div>
                </section>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <div className="border flex items-center rounded-xl ">
                    <textarea
                      defaultValue={descriptionD}
                      name="description"
                      rows="6"
                      required
                      placeholder="Write a description"
                      className="flex-1 resize-none focus:outline-none py-2 px-3 bg-transparent"
                    ></textarea>
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button className="btn rounded-full py-3 min-h-max h-max bg-pColor border-none text-white hover:bg-pColor">
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
   
  );
};

export default MyServices;
