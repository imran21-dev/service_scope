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
    <div className="w-10/12 mx-auto py-10 text-center">
       <Helmet>
                    <title>Add Service | Service Scope</title>
                  </Helmet>
      <h1 className="text-xl font-semibold">Add a New Service</h1>
      <p className="py-1 text-secondaryTextColor/50">
        Provide details to expand your offerings.
      </p>

      <form onSubmit={handleAddService} className="card-body w-7/12 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Service Title</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <input
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

            <CustomSelectProps></CustomSelectProps>
          </div>
        </section>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <div className="border flex items-center rounded-xl ">
            <textarea
              name="description"
              rows="6"
              required
              placeholder="Write a description"
              className="flex-1 focus:outline-none py-2 px-3 bg-transparent"
            ></textarea>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn rounded-full py-3 min-h-max h-max bg-pColor border-none text-white hover:bg-pColor">
            {loading && <ImSpinner9 className="animate-spin" />} Add Service
          </button>
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default AddService;
