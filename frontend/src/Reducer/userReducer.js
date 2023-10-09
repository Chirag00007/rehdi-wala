import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS , CLEAR_ERROR, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST, REGISTER_USER_FAIL, VENDOR_REGISTER_USER_FAIL, VENDOR_REGISTER_USER_REQUEST, VENDOR_REGISTER_USER_SUCCESS } from "../Constants/userConstants";



export const userReducer = (state = { user: {}, token: '' }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
            case VENDOR_REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuth: false,
                success : false
            }
        case REGISTER_USER_SUCCESS:
            case VENDOR_REGISTER_USER_SUCCESS:
            return {
              ...state,
              loading: false,
              isAuth: false,
              token: action.payload.token,
              success: true,
            };
        case LOGIN_SUCCESS:
           
            return {
              ...state,
              isAuth: true,
              loading: false,
              user: action.payload.user,
              success: true,
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            case VENDOR_REGISTER_USER_FAIL:
            return {
              ...state,
              loading: false,
              isAuthenticated: false,
              user: null,
              error: action.payload,
              success: false,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state

    }
}