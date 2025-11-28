import React, { useState } from 'react'; // CHANGE: Added useState import

function Login() {
  // CHANGE: Initialized state with empty strings ('') instead of null
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // This state can be used to show a message after login attempt
  const [message, setMessage] = useState('');

  // CHANGE: Renamed function to follow standard conventions (e.g., handleSubmit)
  function handleSubmit(event) {
    // A good practice to prevent the default form submission which reloads the page
    event.preventDefault(); 

    // This is where you would handle the actual login logic
    console.log('Attempting login with:');
    console.log('Email:', email);
    console.log('Password:', password);

    // Example of using the third state to give user feedback
    setMessage(`Login attempt for ${email} was successful!`);
  }

  return (
    // To use event.preventDefault(), it's best to use a form element
    <form onSubmit={handleSubmit}>
      <div>
        {/* CHANGE: Added the onChange handler to update the state */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
          required // Good practice for login forms
        />
      </div>

      <div>
        {/* CHANGE: Added the onChange handler to update the state */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          required // Good practice for login forms
        />
      </div>

      <div>
        {/* CHANGE: The button now submits the form */}
        <button type="submit">Login</button>
      </div>

      <div>
        {/* CHANGE: Displaying the message state instead of the unused 'value' */}
        <h3>{message}</h3>
      </div>
    </form>
  );
}

export default Login;