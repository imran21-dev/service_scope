import { GoArrowRight } from "react-icons/go";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const ServiceCart = ({service}) => {
    const {price,serviceImage,serviceTitle,description} = service
   
    return (
        <div className="card hover: duration-200 rounded-3xl  border border-secondaryTextColor/5">
        <figure className="p-5">
          <img
          className="w-full object-cover h-52 rounded-2xl"
            src={serviceImage}
            alt="Shoes" />
        </figure>
        <div className="card-body px-5 pt-0 pb-5">
          <h2 className="text-xl font-bold truncate">{serviceTitle}</h2>
          <p className="line-clamp-2  h-12 text-secondaryTextColor/50">{description}</p>
         
         <div className="flex items-center justify-between pt-2">
         <Button variant="contained" className="mt-1 myBtn">See Details <GoArrowRight /></Button>
         <h2 className="font-medium">Price: ${price}</h2>
         </div>
        </div>
      </div>
    );
};

ServiceCart.propTypes = {
    service: PropTypes.object
}
export default ServiceCart;
