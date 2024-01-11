import React, { useEffect, useState } from 'react';

const URL = "/api"

function FavoritesComponent() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites(); 
  }, []); 
  
  
  const fetchFavorites = async () => {
    try {
      const response = await fetch(URL + '/userProfile/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFavorite = async (favoriteId) => {
    
    try {
      const response = await fetch(URL + `/favorites/${favoriteId}`, {
        method: 'DELETE', 
      });
      if (response.ok) {
        // Update the favorites state to reflect the removal
        setFavorites(currentFavorites => currentFavorites.filter(fav => fav.id !== favoriteId));
      } else {
        console.error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
console.log(favorites)
  return (
    <div>
      <h1>My Favorites</h1>
      <div className="favorites-list">
        {favorites.map(favorite => (
          <div key={favorite.listing.id} className="favorite-item">
            <h3>{favorite.listing.street_address}</h3>
            <img src={favorite.listing.image_url} alt={favorite.listing.street_address} />
            <p><strong>City:</strong> {favorite.listing.city}</p>
            <p><strong>Price:</strong> ${favorite.listing.price}</p>
            <p><strong>Zip Code:</strong> {favorite.zip_code}</p>
            <p><strong>State:</strong> {favorite.state}</p>
            <p><strong>Square Footage:</strong> {favorite.square_footage} sqft</p>
            <p><strong>Lot Size:</strong> {favorite.lot_size}</p>
            <button onClick={() => removeFavorite(favorite.id)}>Remove from Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesComponent;