// import React, { useState } from "react";
// import { Button, Modal } from "daisyui";
// import ReactStars from "react-rating-stars-component";

// const UpdateModal = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [rating, setRating] = useState(3); // Initial rating value

//   const handleRatingChange = (newRating) => {
//     setRating(newRating); // Update the rating dynamically
//   };

//   return (
//     <div>
//       {/* Button to toggle modal */}
//       <Button onClick={() => setOpenModal(true)} className="btn-primary">
//         Open Modal
//       </Button>

//       {/* Modal */}
//       <Modal open={openModal} onClickBackdrop={() => setOpenModal(false)}>
//         <div className="flex flex-col items-center p-4">
//           {/* React Rating Component */}
//           <ReactStars
//             count={5}
//             value={rating}
//             onChange={handleRatingChange}
//             size={40}
//             activeColor="#ffd700"
//           />
//           <Button className="btn-primary mt-4" onClick={() => setOpenModal(false)}>
//             Close
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default UpdateModal;
