import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/home';
import ListingsComponent from './components/Listing';
import { useEffect, useState } from 'react';
import UserPanel from './components/UserPanel/Index';
import SignupLogin from './components/SignupLogin';
import NavBar from './components/Navbar';
import BudgetCalculator from './components/Calulator';
import FavoritesComponent from './components/Favorites'
import Investment from './components/InvestmentTab';

const URL = "/api"
const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

function App() {

  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])

  const navigate = useNavigate()

  useEffect(() => { 
    fetch(URL + "/check_session")
      .then((res) => {  
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
        else{
          res.json().then((error) => console.log(error));          
        }      
    });
  }, []);

  useEffect(() => {
    fetch(URL + '/listings')
    .then(res => {
      if (res.ok) {
        res.json().then(listings => {
          console.log(listings); // Add this line to log the data
          setListings(listings);
        })
      };
    });
  }, []); 
   


// handle signup function (needs formdata set up for input) //
async function handleSignup(userInfo) {
  console.log(userInfo)
  const res = await fetch(URL + '/users', {
    method: 'POST',
    headers: POST_HEADERS,
    body: JSON.stringify(userInfo)
  })
  if (res.ok) {
    const data = await res.json()
    setUser(data)
    navigate("/listings")
  }
  else {
    alert('Invalid sign up')
  }
}

async function handleLogin(userInfo) {
  const res = await fetch(URL + '/login', {
    method: 'POST',
    headers: POST_HEADERS,
    body: JSON.stringify(userInfo)
  })
  if (res.ok) {
    const data = await res.json()
    setUser(data)
    navigate("/listings")
  }
  else {
    alert('Invalid login')
  }
}

function logout() {
  setUser(null)
  fetch(URL + '/logout', { method: "DELETE" })
}

async function updateBudget(userId, newBudget) {
  const response = await fetch(`${URL}/users/${userId}/budget`, {
    method: 'PATCH',
    headers: POST_HEADERS,
    body: JSON.stringify({ budget: newBudget })
  });
  if (response.ok) {
    console.log('Budget updated successfully');
    // You might want to update the user state here as well
  } else {
    console.error('Failed to update budget');
  }
}



useEffect(() => {
  fetchFavorites(); 
}, []); 


const fetchFavorites = async () => {
  try {
    const response = await fetch(URL + '/favorites');
    if (response.ok) {
      const data = await response.json();
      setFavorites(data);
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};

async function handleFavorite(listingId) {
  try {
    const response = await fetch(URL + '/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, listing_id: listingId })
    });
    if (response.ok) {
      fetchFavorites()
      console.log('Listing added to favorites');
    } else {
      // Handle errors
      console.error('Failed to add favorite');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

  return (
    <div className="App"> 
      <NavBar logout={logout} />    
      <div className='content'>
        <Routes>

          <Route path="/" element={ <HomePage/> }/>
          <Route path="/login" element={<UserPanel currentUser={user} attemptLogin={handleLogin} attemptSignup={handleSignup} logout={logout} />}/>
          <Route path="/listings" element={<ListingsComponent listings={listings} onFavorite={handleFavorite} onUpdateBudget={updateBudget} user={user} />} />
          <Route path="/calculator" element={<BudgetCalculator />} />
          <Route path="/favorite" element={<FavoritesComponent favorites={favorites} />} />
          {/* <Route path="/investment" element={<Investment user={user} onUpdateBudget={updateBudget}listings={listings} />} /> */}

      
          {/* <Route path="/login" element={<SignupLogin attemptLogin={handleLogin} attemptSignup={handleSignup} />} />         */}

        </Routes>
      </div>
    </div>     
  )
  

 
}

export default App;