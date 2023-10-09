import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearError, userRegister } from "../../Action/userAction";
import { toast } from "react-toastify";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuth, error, loading, success } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    latitude: null,
    longitude: null,
  });

  const { name, email, password, latitude, longitude } = user;

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUser({
              ...user,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => console.error("Error getting user location:", error)
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    useEffect(() => {
      if(isAuth){
        history.push('/')
      }
      if (error) {
              toast.error(error);
              dispatch(clearError());
      }
    }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await  getUserLocation();
    await dispatch(userRegister({ name, email, password, latitude, longitude }));
    
    if (success) {
      toast.success('Verification link sended on your mail!')
    }
  };

  const registerChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };



  return (
    <>
      <div className="login_page">
        <div className="log_img"></div>
        <form
          className="login_form shadow-2xl rounded-2xl"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1>Register User </h1>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Your Name"
            value={name}
            onChange={registerChange}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={registerChange}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Enter Your Password"
            value={password}
            onChange={registerChange}
          />
          <button className="login_btn" type="submit" value={"Register"}>
            Register
          </button>
          <Link
            className="text-[10px] my-6 text-sky-700 cursor-pointer"
            to="/vendorRegister"
          >
            Register as Vendor!
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
