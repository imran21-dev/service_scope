import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const ServiceDetails = () => {
    const {id} = useLoaderData()
    const [service, setService] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/single-service?id=${id}`)
        .then(res => setService(res.data))
    },[id])

    const {addedDate,category,companyName,description,price,serviceImage,serviceTitle,userEmail,website} = service


    
    return (
        <div className="w-10/12 mx-auto py-10">
            <section className="flex gap-7">
                <img className="w-96 h-64 object-cover rounded-badge border-2 border-pColor/20" src={serviceImage} alt="" />
                <div>
                    <h1 className="text-2xl font-bold">{companyName}</h1>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetails;