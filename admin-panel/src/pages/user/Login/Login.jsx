import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../services/AuthService';
import { StoreContext } from '../../../context/StoreContext';
import { toast } from 'react-toastify';

const Login = () => {
  const {setToken,loadCartData} = useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
      email: "",
      password: ""
    })
    const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try{
      const response = await loginUser(data);
      debugger;
        setToken(response.token);
        localStorage.setItem('token',response.token);
        toast.success("login successful");
        await loadCartData(response.token);
        navigate('/');
      }catch(error){
        toast.error("unable to login. Please try again",error);
      }
     
    }
  return (
    <div className="container container-login">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fw-bold">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                name='email'
                value={data.email}
                onChange={onChangeHandler}
                required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                name='password'
                value={data.password}
                onChange={onChangeHandler}
                required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                <label className="form-check-label" htmlFor="rememberPasswordCheck">
                  Remember password
                </label>
              </div>
              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                  in</button>

              </div>
              <div className="mt-4">
                Don't have an account <Link to="/register">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login