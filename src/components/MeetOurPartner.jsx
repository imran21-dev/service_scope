import { useEffect, useState } from "react";


import PartnerCart from "./PartnerCart";



const MeetOurPartner = () => {
    const [partners, setPartners] = useState([])
    useEffect(()=> {
        fetch('partner.json')
        .then(res => res.json())
        .then(data => setPartners(data))
    },[])
  return (
    <div className="md:w-10/12 mx-3 md:mx-auto py-10">
      <h1 className="text-xl md:text-2xl font-semibold text-center pb-5">Meet Our Partners</h1>
      
     
     
   <div className="flex justify-center flex-wrap gap-5">
      {
         partners.map(partner => <PartnerCart partner={partner} key={partner.name}></PartnerCart>)
        }
      </div>
   
   
         
     
  
    </div>
  );
};

export default MeetOurPartner;
