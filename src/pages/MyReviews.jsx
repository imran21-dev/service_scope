import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ContextApi";
import MyReviewCard from "../components/MyReviewCard";


const MyReviews = () => {

    const {user} = useContext(ThemeContext)
    const userMail = user?.email
    const [myReviews, setMyReviews] = useState([])
    const [demoLoad, setDemoLoad] = useState(0)

    useEffect(()=> {
        axios.get(`http://localhost:5000/my-reviews?email=${userMail}`)
        .then(res => {
            setMyReviews(res.data)
        })
    },[userMail,demoLoad])
    
  
    return (
        <div className="w-10/12 mx-auto py-10 relative">
           <h1 className="text-xl font-semibold">My Reviews</h1>
           <div className="space-y-3 pt-4">
            {
            myReviews.map(review => <MyReviewCard review={review} demoLoad={demoLoad} setDemoLoad={setDemoLoad} key={review._id}></MyReviewCard>)
            }
           </div>
        </div>
    );
};

export default MyReviews;