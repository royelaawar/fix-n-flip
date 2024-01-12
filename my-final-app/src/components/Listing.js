import React, { useState, useEffect, useRef } from 'react';

const SelectedHeader = ({ EscapeButton }) => {
  return <div className='selectedHeader'>
    { EscapeButton }
  </div>; 
};

const ListingDetails = ({ city, price, zip_code, state, square_footage, lot_size }) => {
  return <div className='listingDetails'>
    <h3>Details</h3>
    <div className='listingParams'>
      <div>
        <strong>City:</strong> 
        <span>{city}</span>
      </div>
      <div>
        <strong>Price:</strong>
        <span>${price}</span>
      </div>
      <div>
        <strong>Zip Code:</strong> 
        <span>{zip_code}</span>
      </div>
      <div>
        <strong>State:</strong> 
        <span>{state}</span>
      </div>
      <div>
        <strong>SQFT:</strong> 
        <span>{square_footage}</span> 
      </div>
      <div>
        <strong>Lot Size:</strong>
        <span>{lot_size}</span>
      </div>

    </div>
  </div>;
};

const Listing = ({ listing, i, setClickedIndex, clickedIndex, getGlowClass, onFavorite, EscapeButton }) => {
  const isActive = clickedIndex === i;
  const activeComponents = isActive ? <>
     <SelectedHeader EscapeButton={ EscapeButton }/>
     <ListingDetails {...listing }/>
  </> : null;


  return <div 
    onClick={ ( ) => setClickedIndex( i )} 
    key={listing.id} className={"listing"} 
    is-active={( clickedIndex !== null ? isActive : "none" ).toString( )} 
    exceed-budget={ getGlowClass(listing.price) }>
    <h2 className='listingName'>{listing.street_address}</h2>
    { activeComponents }

    <div className='listingImgs'>
      {/* <div className='imgFrame'> */}
      { listing.images && listing.images.map( image => <img key={image.id} src={image.image_url} alt="Listing" /> )}
      {/* </div> */}
      
    </div>
    

    
    <div className='quickControls'>
      <button onClick={(event) => { event.stopPropagation(); onFavorite(listing.id)}}>Add to Favorites</button>
    </div>
    
  </div>;

};


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

      [ x, y ] = [ clickedIndex % 4, Math.floor( clickedIndex / 4) ];

      style["click-active"] = "T";
      
      style.gridTemplateColumns = 
        `${ x === 0 ? "100%" : "0" } ${ x === 1 ? "100%" : "0" } ${ x === 2 ? "100%" : "0" } ${ x === 3 ? "100%" : "0" }`;
      style.gridTemplateRows = 
        `${ y === 0 ? "100%" : "0" } ${ y === 1 ? "100%" : "0" } ${ y === 2 ? "100%" : "0" } ${ y === 3 ? "100%" : "0" }`;
    } else {
      style.gridTemplateRows = "255px 255px 255px 255px";
    };

    for (let i = 0; i < rowLen; i++) {

      if( i === y ) rowStr += "100% ";
        else if( clickedIndex !== null ) rowStr += "0 ";
        else rowStr += "300px";
    };
    
    const EscapeButton = <button onClick={ e => { e.stopPropagation( ); setClickedIndex(null)}} id="Esc">
      X
    </button>;

    const listingProps = { getGlowClass, setClickedIndex, clickedIndex, onFavorite, EscapeButton };
    
    
    const clickedIndexRef = useRef(clickedIndex);

    useEffect(() => {
      clickedIndexRef.current = clickedIndex;
    }, [clickedIndex]);

    const handleEscape = ( e ) => {
      console.log(clickedIndex);
      if( e.key === 'Escape') setClickedIndex( null );
      if( e.key === 'ArrowRight' ) setClickedIndex( clickedIndexRef.current + 1 );
      if( e.key === 'ArrowLeft' ) setClickedIndex( clickedIndexRef.current - 1 );
    };
    
    useEffect(( ) => { 
      window.addEventListener( 'keydown', handleEscape );
      return ( ) => window.removeEventListener( 'keydown', handleEscape );
    }, [ ]);

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

        <div className="listingList" style={ style } click-active={ clickedIndex !== null ? "T" : "F" }> 
            { listings.map(( listing, i ) =>  <Listing i={i} listing={listing} { ...listingProps }/> )}
        </div> 

      
    </div>
  );
}

export default ListingsComponent;
