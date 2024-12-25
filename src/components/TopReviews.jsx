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
        <div className="md:w-10/12 mx-3 md:mx-auto py-10">
            
            <h1 className="text-lg md:text-xl font-semibold">Top Reviews</h1>

          {
           skeletonTime ?  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-5 gap-3  py-5">
           {
            skeletonCount.map((skeleton, idx) => <ReviewSkeleton  key={idx}></ReviewSkeleton>)
           }
       </div> :
         <div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-5 gap-3 py-5">
         {
          topReviews.map(review => <TopReviewCart review={review} key={review._id}></TopReviewCart>)
         }
     </div>
          }

           

           
        </div>
    );
};

export default TopReviews;