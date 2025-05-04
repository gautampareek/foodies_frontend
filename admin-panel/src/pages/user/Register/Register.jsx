import React, { useContext, useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { registerUser } from '../../../services/AuthService'
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
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
    const response = await registerUser(data);
    toast.success("Registered successfully. Please login");
    navigate("/login");
    }catch(error){
      toast.error("unable to register. Please try again");
    }
   
  }
  return (
    <div className="container conatiner-login">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fw-bold">Register</h5>
              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInputname" placeholder="John Doe" name='name'
                    value={data.name}
                    onChange={onChangeHandler}
                    required
                  />
                  <label htmlFor="floatingInputname">Name</label>
                </div>
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
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Register
                    </button>

                </div>
                <div className="mt-4">
                  Already have an account <Link to="/login">Sign In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register