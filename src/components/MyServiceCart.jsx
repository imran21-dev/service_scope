import axios from "axios";
import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import Swal from "sweetalert2";
import fakeThumb from '../assets/fakeThumb.jpg'
import { CiShare1 } from "react-icons/ci";
import { Link } from "react-router-dom";


const MyServiceCart = ({service,setDemoLoad,demoLoad,handleUpdate,}) => {
  const {category,companyName,description,price,serviceImage,serviceTitle,website,_id,addedDate} = service
    

const handleWebsite = () => {
    window.open(`${website}`, "_blank", "noopener,noreferrer");
}

const handleDelete = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want delete this service?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f12804",
        cancelButtonColor: "#16A34A",
        confirmButtonText: "Yes, Delete it",
        customClass: {
          title: "text-xl  md:text-3xl font-bold ",
          text: "text-3xl ",
          popup: "text-black rounded-3xl ",
          confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
          cancelButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
        },
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:5000/delete-service/${_id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  icon: "success",
                  title: "Deleted!",
                  text: "Service deleted Successfully!",
                  confirmButtonText: "Okay",
                  scrollbarPadding: false,
                  showConfirmButton: false,
                  timer: 1500,
                  customClass: {
                    title: "text-xl  md:text-3xl font-bold ",
                    text: "text-3xl ",
                    popup: "text-black rounded-3xl outline outline-[#16A34A]",
                    confirmButton:
                      "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
                  },
                });
               setDemoLoad(demoLoad + 1)
              }
            });
        }
      });
    
  
}

const handleImage = (e) => {
  e.target.src = fakeThumb
}
    return (
        <tr className="flex w-full justify-between hover:bg-pColor/5 rounded-xl">
             
        <td className="w-3/6">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                 onError={handleImage}
                  src={serviceImage}
                  alt=""
                />
              </div>
            </div>
            <div className="w-full">
              <Link to={`/service-details/${_id}`} className="font-bold hover:text-pColor duration-150 flex items-center gap-1">{serviceTitle}<CiShare1 className="opacity-80"/></Link>
              <div className="text-sm opacity-70  w-11/12 truncate">{description}</div>
              <h2 className="text-xs opacity-70">Added on : {addedDate}</h2>
            </div>
          </div>
        </td>

        
        <td className="w-1/6">

        <h1 className="font-medium pb-1 w-11/12 truncate">  {companyName}</h1>
         
          <h2 onClick={handleWebsite} className="badge-secondary duration-150 w-max hover:badge-neutral rounded-badge px-3 cursor-pointer items-center bg-pColor flex gap-1 text-sm">
            Visit website <FaLocationArrow className="text-xs"/>
          </h2>
        </td>
        <td className="w-1/6 ">
            <h2 className="w-11/12 truncate font-medium">{category}</h2>
        </td>
        <td className="w-1/12 ">
        <h1 className="w-11/12 truncate text-pColor font-medium">${price}</h1>
        </td>

        <th className="w-1/12 flex">
          <button onClick={() => {
            handleUpdate(_id)
           
            }} className="btn btn-ghost text-pColor hover:bg-pColor hover:text-white btn-xs"> 
          
            Edit</button>
          <button onClick={handleDelete} className="btn btn-ghost text-red-500 hover:bg-red-500 hover:text-white btn-xs">Delete</button>
        </th>
      </tr>
    );
};
MyServiceCart.propTypes = {
    service : PropTypes.object,
    demoLoad : PropTypes.number,
    setDemoLoad : PropTypes.func,
    handleUpdate : PropTypes.func,
}
export default MyServiceCart;