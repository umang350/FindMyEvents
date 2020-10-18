import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import Navbar from './Components/navbar';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3001/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/events');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });

  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
      <br/>
      <br/><br/>
      <br/>
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon">
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="username" {...username} autoComplete="username" />

                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input type="password" className="form-control" placeholder="password" {...password} autoComplete="password" />
                </div>
                <div className="form-group">
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                  <input type="button" className="btn btn-secondary float-right login_btn" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
                  {/* <input type="submit" value="Login" className="btn float-right login_btn" /> */}
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account? Contact Admin
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;