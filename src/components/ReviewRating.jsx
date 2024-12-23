import { Rating, Stack, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const ReviewRating = ({ rating, setRating, error , setError}) => {
  return (
    <div className="flex items-center gap-1">
      
      <Stack spacing={1}>
      <Tooltip
        title={error ? 'Please provide a rating': ''}
        placement="top"
        arrow
        open={error}
      >
        <Rating
        onChange={(event, newValue) => 
        {

            setRating(newValue)
            setError(false)
        }
        }
         name="half-rating" 
        value={rating}
         precision={1} />
         </Tooltip>
      </Stack>

      <h2 className=" font-medium text-pColor">({rating ? rating : '0'})</h2>
     
    </div>
  );
};
ReviewRating.propTypes = {
  setRating : PropTypes.func,
  setError : PropTypes.func,
  rating : PropTypes.number,
  error : PropTypes.bool,
}
export default ReviewRating;
