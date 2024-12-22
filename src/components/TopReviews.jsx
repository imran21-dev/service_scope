import axios from "axios";
import { useEffect, useState } from "react";
import TopReviewCart from "./TopReviewCart";


const TopReviews = () => {
    const [topReviews, setTopReviews] = useState([])

useEffect(()=> {
    axios.get('http://localhost:5000/popular-reviews')
    .then(res => setTopReviews(res.data))
},[])

    return (
        <div className="w-10/12 mx-auto py-10">
            
            <h1 className="text-xl font-semibold">Top Reviews</h1>

            <div className="grid grid-cols-5 gap-5 py-5">
                {
                 topReviews.map(review => <TopReviewCart review={review} key={review._id}></TopReviewCart>)
                }
            </div>
        </div>
    );
};

export default TopReviews;