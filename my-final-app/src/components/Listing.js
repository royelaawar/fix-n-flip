import React, { useState, useEffect } from 'react';

function ListingsComponent({ listings, onFavorite, onUpdateBudget, user }) {
  const [budget, setBudget] = useState('');
  const [averagePrice, setAveragePrice] = useState(0);
  const [selectedListingId, setSelectedListingId] = useState(null);
  

  useEffect(() => {
    if (listings.length > 0) {
      setAveragePrice(calculateAveragePrice(listings));
    }
  }, [listings]);

  const calculateAveragePrice = (listings) => {
    const total = listings.reduce((acc, listing) => acc + listing.price, 0);
    return total / listings.length;
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateBudget(user.id, budget);
  };

  const handleSubmitBudget = (event) => {
    event.preventDefault();
    onUpdateBudget(user.id, budget);  // Update the budget in the parent component or backend
  };

  // Updated logic to determine the glow color
  const getGlowClass = (listingPrice) => {
    const total = parseFloat(budget) + listingPrice;
    return total < averagePrice ? 'belowAverage' : 'aboveAverage';
  };

  const handleListingClick = (listingId) => {
    setSelectedListingId(listingId === selectedListingId ? null : listingId);
  };

  //set this to null in order to escape "focus"
  const [ clickedIndex, setClickedIndex ] = useState( null );

  const listLen = listings.length;
  let rowLen = Math.ceil(listLen / 4);
  let style = { };
  let rowStr= '';
  let [ x, y ] = [ null, null ];

    if( clickedIndex !== null ) {
        console.log( clickedIndex );
        [ x, y ] = [ clickedIndex % 4, Math.floor( clickedIndex / 4) ];
        style["click-active"] = "T";
        
        style.gridTemplateColumns = 
        `${ x === 0 ? "100%" : "0" } ${ x === 1 ? "100%" : "0" } ${ x === 2 ? "100%" : "0" } ${ x === 3 ? "100%" : "0" }`;
        style.gridTemplateRows = 
        `${ y === 0 ? "100%" : "0" } ${ y === 1 ? "100%" : "0" } ${ y === 2 ? "100%" : "0" } ${ y === 3 ? "100%" : "0" }`;

    };

    for (let i = 0; i < rowLen; i++) {
        console.log( i, y );
        if( i === y ) rowStr += "100% ";
        else if( clickedIndex !== null ) rowStr += "0 ";
        else rowStr += "600px ";
    };
    console.log( rowStr );
    style.gridTemplateRows = rowStr;
    
    const EscapeButton = () => (
        <button onClick={() => setClickedIndex(null)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2}}>
          Close Image
        </button>
      );
    

  return (
    <div>
      <h1>Listings</h1>
      <form onSubmit={handleSubmit}>
      
        <h2>Set Your Investment Budget</h2>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="Enter your budget"
        />
        <button type="submit">Submit Budget</button>
      </form>

        <div className="listingList" style={ style }> { clickedIndex !== null && <EscapeButton /> }
            {
                listings.map(( listing, i ) => (
                    <div onClick={ ( ) => setClickedIndex( i )} key={listing.id} className={`listing ${getGlowClass(listing.price)}`} style={{ backgroundColor: clickedIndex === i ? "gold" : null }}>

                        { listing.images && listing.images.map( image => <img key={image.id} src={image.image_url} alt="Listing" /> )}
                        
                        <h2>{listing.street_address}</h2>

                        <span><strong>City:</strong> {listing.city}</span>
                        <span><strong>Price:</strong> ${listing.price}</span>
                        <span><strong>Zip Code:</strong> {listing.zip_code}</span>
                        <span><strong>State:</strong> {listing.state}</span>
                        <span><strong>Square Footage:</strong> {listing.square_footage} sqft</span>
                        <span><strong>Lot Size:</strong> {listing.lot_size}</span>
                        <button onClick={(event) => { event.stopPropagation(); onFavorite(listing.id)}}>Add to Favorites</button>
                        {/* Add more details as needed */}
                    </div>
                ))
            }
        </div> 

      
    </div>
  );
}

export default ListingsComponent;
