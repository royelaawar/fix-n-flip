import { useState } from 'react'

function Signup({attemptSignup}) {

  // STATE //

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // EVENTS //

  const handleChangeUsername = e => setUsername(e.target.value)
  const handleChangePassword = e => setPassword(e.target.value)

  function handleSubmit(e) {
    e.preventDefault()
    attemptSignup({username, password})
  }

  // RENDER //

  return (
    <form className='user-form' onSubmit={handleSubmit}>

      <h2>Signup</h2>

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

      {/* #I need to change the below to "budget" */}

      {/* <input type="text" 
      onChange={handleChangePassword}
      value={password}
      placeholder='budget amount'
      /> */}

      <input type="submit"
      value='Signup'
      />

    </form>
  )

}

export default Signup