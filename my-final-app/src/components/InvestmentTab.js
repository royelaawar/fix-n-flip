// import React, { useState, useEffect } from 'react';

// function Investment({ user, onUpdateBudget, listings }) {
//   const [budget, setBudget] = useState('');
//   const [averagePrice, setAveragePrice] = useState(0);

//   useEffect(() => {
//     if (listings.length > 0) {
//       setAveragePrice(calculateAveragePrice(listings));
//     }
//   }, [listings]);

//   const calculateAveragePrice = (listings) => {
//     const total = listings.reduce((acc, listing) => acc + listing.price, 0);
//     return total / listings.length;
//   };

//   const handleBudgetChange = (event) => {
//     setBudget(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onUpdateBudget(user.id, budget);
//   };

//   // Updated logic to determine the glow color
//   const getGlowClass = (listingPrice) => {
//     const total = parseFloat(budget) + listingPrice;
//     return total < averagePrice ? 'belowAverage' : 'aboveAverage';
//   };

//   return (
//     <div>
//       <h2>Set Your Investment Budget</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           value={budget}
//           onChange={handleBudgetChange}
//           placeholder="Enter your budget"
//         />
//         <button type="submit">Submit Budget</button>
//       </form>
//       <div className="listingList">
//         <h3>All Listings</h3>
//         {listings.map(listing => (
//           <div 
//             key={listing.id} 
//             className={`listing ${getGlowClass(listing.price)}`}
//           >
//             {listing.images && listing.images.map(image => (
//               <img key={image.id} src={image.image_url} alt="Listing" />
//             ))}
//             <h4>{listing.street_address}</h4>
//             <p><strong>City:</strong> {listing.city}</p>
//             <p><strong>Price:</strong> ${listing.price}</p>
//             <p><strong>Zip Code:</strong> {listing.zip_code}</p>
//             <p><strong>State:</strong> {listing.state}</p>
//             <p><strong>Square Footage:</strong> {listing.square_footage} sqft</p>
//             <p><strong>Lot Size:</strong> {listing.lot_size}</p>
//             {/* Add more details as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Investment;
