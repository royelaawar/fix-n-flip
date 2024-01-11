import React from 'react'
import Signup from './UserPanel/Signup'
import Login from './UserPanel/Login'


function SignupLogin({attemptSignup, attemptLogin}) {


    return(
        <div>
            
            <Signup attemptSignup={attemptSignup}/>
            <Login attemptLogin={attemptLogin}/>
            
        </div>
    )
}

export default SignupLogin