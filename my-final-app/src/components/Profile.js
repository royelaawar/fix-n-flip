import React, { useState, useEffect } from 'react';


function UserProfile({ user }) {
    return (
      <div>
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
  