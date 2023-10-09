import React, { useState, useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import {clearError, vendorRegister} from '../../Action/userAction'
import { toast } from "react-toastify";


const VendorRegisterPage = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    email: "",
    vendorPassword: "",
    vendorPhone: "",
    vendorAadhar: "",
  });

  const { error, user, loading } = useSelector(state => state.user)
  
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit(e){
    e.preventDefault();

    const myform = new FormData();
    
    dispatch(vendorRegister({formData.vendorNameformData.email, formData.vendorPassword, formData.vendorPhone, formData.vendorAadhar}))
  };

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
  }, [])
  

  return (
   <div className="login_page">
        <div className="log_img"></div>

      <form
        className="login_form shadow-2xl rounded-2xl"
        onSubmit={handleSubmit}
      >
      <h1 >Vendor Registration</h1>
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          required
          value={formData.vendorName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="vendorPassword"
          placeholder="Password"
          required
          value={formData.vendorPassword}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="vendorPhone"
          required
          placeholder="Phone"
          value={formData.vendorPhone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="vendorAadhar"
          required
          placeholder="Aadhar Number"
          value={formData.vendorAadhar}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VendorRegisterPage;
