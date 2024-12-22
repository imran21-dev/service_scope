import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCart from "./ServiceCart";


const FeaturedServices = () => {
    const [featuredServices, setFeaturedServices] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/')
        .then(res => setFeaturedServices(res.data))
    },[])


    return (
        <div className="w-10/12 mx-auto py-10">
            
            <h1 className="text-xl font-semibold">Featured Services</h1>

           <div className="grid grid-cols-4 gap-6  py-5">
           {
             featuredServices.map(service => <ServiceCart service={service} key={service._id}></ServiceCart>)
            }
           </div>
        </div>
    );
};

export default FeaturedServices;