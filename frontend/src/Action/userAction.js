import axios from "axios"
import { CLEAR_ERROR, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS , VENDOR_REGISTER_USER_FAIL,VENDOR_REGISTER_USER_SUCCESS,VENDOR_REGISTER_USER_REQUEST  } from "../Constants/userConstants"


export const userLogin = ({email , password}) =>  async (dispatch) => {
    try {
        dispatch({type : LOGIN_REQUEST})

        const { data } = await axios.post("/api/user/login", {
          email,
          password,
        });

        // localStorage.setItem('auth_token', token)
        
        dispatch({
            type : LOGIN_SUCCESS,
            payload : data.user
        })

    } catch (error) {
         dispatch({
            type : LOGIN_FAIL,
            payload : error.response.data.message
        })
    }
}

export const userRegister =
  ({ name, email, password, latitude, longitude }) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
        latitude,
        longitude,
      });

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
    };
export const vendorRegister = (userData) => async (dispatch) => { 
    try {
      dispatch({ type: VENDOR_REGISTER_USER_REQUEST });
      
      const config = {  headers : { 'Content-Type': 'multipart/form-data' } }

        const { data } = await axios.post("/api/vendor/register", {
          userData,
          config
        });

        dispatch({
          type: VENDOR_REGISTER_USER_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: VENDOR_REGISTER_USER_FAIL,
          payload: error.response.data.message,
        });
      }
    }

//Clearing all errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}