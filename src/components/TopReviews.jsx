import axios from "axios";
import { useEffect, useState } from "react";
import TopReviewCart from "./TopReviewCart";
import ReviewSkeleton from "./ReviewSkeleton";



const TopReviews = () => {
    const [topReviews, setTopReviews] = useState([])
    const skeletonCount = [1,1,1,1,1,1,1,1,1,1]
  const [skeletonTime, setSkeletonTime] = useState(true)
  

useEffect(()=> {
   
    setSkeletonTime(true)
    axios.get('https://service-scope-server.vercel.app/popular-reviews')
    .then(res => {
        setTopReviews(res.data)
        setSkeletonTime(false)
        
    })
},[])

    return (
        <div className="w-10/12 mx-auto py-10">
            
            <h1 className="text-xl font-semibold">Top Reviews</h1>

          {
           skeletonTime ?  <div className="grid grid-cols-5 gap-5 py-5">
           {
            skeletonCount.map((skeleton, idx) => <ReviewSkeleton  key={idx}></ReviewSkeleton>)
           }
       </div> :
         <div className="grid grid-cols-5 gap-5 py-5">
         {
          topReviews.map(review => <TopReviewCart review={review} key={review._id}></TopReviewCart>)
         }
     </div>
          }

           

           
        </div>
    );
};

export default TopReviews;