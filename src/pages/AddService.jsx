import { useContext, useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import CustomSelectProps from "../components/CustomSelectProps";
import { ThemeContext } from "../provider/ContextApi";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useLoadingBar } from "react-top-loading-bar";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddService = () => {
  const [loading, setLoading] = useState(false);
  const { start, complete } = useLoadingBar({ color: "#FA6500", height: 2 });
  const axiosSecure = useAxiosSecure()
  useEffect(()=>{
  start()
  setTimeout(()=>{
    complete()

  }, 500)
  },[complete, start])

  const { user } = useContext(ThemeContext);
  const email = user?.email
  const handleAddService = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const addedDate = new Date().toLocaleDateString("en-GB");
    const userEmail = user?.email;
    const publisherName = user?.displayName
    formData.addedDate = addedDate;
    formData.userEmail = userEmail;
    formData.publisherName = publisherName;

    const {serviceTitle,description,companyName} = formData

    if (serviceTitle.trim("") === "") {
      setLoading(false)
      toast("Please add a Service Title", {
        icon: "😘",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return
    }
    if (companyName.trim("") === "") {
      setLoading(false)
      toast("Please add a Company", {
        icon: "😗",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return
    }
    if (description.trim("") === "") {
      setLoading(false)
      toast("Please add a Description", {
        icon: "😒",
        style: {
          borderRadius: "100px",
          background: "#ff0000",
          color: "#fff",
        },
      });
      return
    }
  

  

    axiosSecure.post(`/add-service?email=${email}`, formData).then((res) => {
      if (res.data.insertedId) {
        setLoading(false)

        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Your service has been successfully added!",
          confirmButtonText: "Okay",
          scrollbarPadding: false,
          showConfirmButton: true,
          customClass: {
            title: "text-xl  md:text-3xl font-bold ",
            text: "text-3xl ",
            popup: "text-black rounded-3xl",
            confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
          },
        });
        e.target.reset()
      }
    });
  };
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">

    <div className="lg:w-10/12 lg:px-0 px-3 pt-3 md:pt-10 mx-auto text-center">
       <Helmet>
                    <title>Add Service | Service Scope</title>
                  </Helmet>
      <h1 className="text-lg md:text-2xl font-bold">Add a New Service</h1>
      <p className="py-1 text-secondaryTextColor/50 md:pb-5 text-sm md:text-base">
        Provide details to expand your offerings.
      </p>

      <form onSubmit={handleAddService} className=" px-3 lg:px-0 md:w-7/12 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="text-xs md:text-sm">Service Title</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <input
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
              type="url"
              name="serviceImage"
              placeholder="Service image URL"
              className=" text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
              required
            />
          </div>
        </div>

        <section className="grid grid-cols-2 gap-x-2 lg:gap-x-6 gap-y-1">
          <div className="form-control">
            <label className="label">
              <span className="text-xs md:text-sm">Company Name</span>
            </label>
            <div className="border flex items-center rounded-xl ">
              <input
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
           <CustomSelectProps></CustomSelectProps>
           </div>
          </div>
        </section>

        <div className="form-control">
          <label className="label">
            <span className="text-xs md:text-sm">Description</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <textarea
              name="description"
              rows="6"
              required
              placeholder="Write a description"
              className="text-sm md:text-base flex-1 focus:outline-none py-2 px-2 bg-transparent"
            ></textarea>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn rounded-full text-xs md:text-[14px] py-3 min-h-max h-max bg-pColor border-none text-white hover:bg-pColor">
            {loading && <ImSpinner9 className="animate-spin" />} Add Service
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
    </div>
  );
};

export default AddService;
