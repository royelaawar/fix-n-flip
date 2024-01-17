import React, { useState, useEffect } from 'react';
import logo from '../icon-fixnflip.png';


function UserProfile({ user }) {
    return (
      <div>
        <img src={logo} alt="FixnFlip Logo" className="top-left-logo" />
        <h2>User Profile</h2>
        {user && user.budget && (
          <>
            <p>Budget: ${user.budget.total}</p>
            <p>Street Address: {user.budget.streetAddress}</p>
          </>
        )}
      </div>
    );
  }
  
  
  
  export default UserProfile;
  