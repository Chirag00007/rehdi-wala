import { useState } from "react";
import { clearError, userLogin } from "../../Action/userAction"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const {isAuth , error , loading}  = useSelector(state => state.user)
  const dispatch = useDispatch();


  const handleSubmit = async (e) => { 
    e.preventDefault();
     dispatch(userLogin({ email, password }))
  }
    
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }

     if (isAuth) {
       toast.success("Logged In Successfully", {
         position: "bottom-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: true,
         progress: undefined,
         theme: "dark",
       });
       history.push('/');
     }
  }, [history])
  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="login_page">
            <div className="log_img"></div>
            <form className="login_form shadow-2xl rounded-2xl">
              <h1>Login User</h1>
              <input
                type="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

                <button onClick={handleSubmit}>Submit</button>
                <Link className="text-[10px] my-6 text-sky-700 cursor-pointer" to="/register">Not Having account ? Register</Link>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Login