import PropTypes from "prop-types";
import { GiStaryu } from "react-icons/gi";

const RatingSummary = ({allReviews}) => {
    const totalReviews = allReviews.length;
  const averageRating = (
    allReviews.reduce((sum, review) => sum + review.ratingStar, 0) / totalReviews
  ).toFixed(1);

  // Count star ratings
  const starCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = allReviews.filter((review) => review.ratingStar === star).length;
    const percentage = ((count / totalReviews) * 100).toFixed(0);
    return { star, count, percentage };
  });

  return (
    <div className="rounded-2xl border p-4 mb-6">
      <h3 className="text-xl flex items-center gap-1 font-semibold pb-1">
        Reviews <GiStaryu className="text-pColor"/> {isNaN(averageRating) ? '0' : averageRating}
      </h3>
      <p className="pb-2 font-medium">{totalReviews} total</p>

      <div className="space-y-2 pt-2">
        {starCounts.map(({ star,  percentage }) => (
          <div key={star} className="grid grid-cols-6 items-center ">
            <label>
              {star}-star
            </label>
            <div className="rounded-full overflow-hidden h-3 relative col-span-4 bg-gray-100">
              <div
                className={`absolute bg-pColor rounded-full h-full `} 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-right">{isNaN(percentage) ? '0' : percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

RatingSummary.propTypes = {
    allReviews : PropTypes.array
}
export default RatingSummary;