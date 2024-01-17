import { useState } from 'react'

function Login({attemptLogin}) {

  // STATE //

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // EVENTS //

  const handleChangeUsername = e => setUsername(e.target.value)
  const handleChangePassword = e => setPassword(e.target.value)

  function handleSubmit(e) {
    e.preventDefault()
    attemptLogin({username, password})
  }

  // RENDER //

  return (
  <div>
  <div className="login-container">
    <form className='user-form' onSubmit={handleSubmit}>

      <h2>Login</h2>

      <input type="text"
      onChange={handleChangeUsername}
      value={username}
      placeholder='username'
      />

      <input type="password"
      onChange={handleChangePassword}
      value={password}
      placeholder='password'
      />

      <input type="submit"
      value='Login'
      />

    </form>
  </div>
  <div>
      <p className="slogan">"Profitable Properties, Powerful Possibilities – Flip with Confidence."</p>
    </div>
  </div>
  )

}

export default Login