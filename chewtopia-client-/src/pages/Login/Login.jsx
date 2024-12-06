import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha'; // captcha 
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2' // npm install sweetalert2
import SocialLogin from '../../components/SocialLogin/SocialLogin';
const Login = () => {

    const { signIn } = useContext(AuthContext)

    // redirect to previous page

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        // console.log(email, password);
        signIn(email, password).then(result => {
            const user = result.user
            console.log(user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(from, {replace : true}) // redirect to previous page
        })

    }
    // captch start
    const [disable, setDisable] = useState(true)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])


    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }
        else{
            setDisable(true)
        }

    }
    // captch ends

    

    return (
        <>
            <Helmet>
                <title>Log In</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full md:w-1/2 max-w-sm shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha}  type="text"  name="captcha" placeholder="type the text above" className="input input-bordered" /*required */  />
                                {/* <button className="btn btn-outline btn-xs mt-3">Validate</button> */}
                            </div>
                            <div className="form-control mt-6">
                                {/* changed btn to input  */}
                                <input /*disabled={disable}   it'll be undisabled if the captcha is validated */ type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='p-6'><small>New Here? <Link to='/signup'>Sign Up</Link></small></p>
                    </div>
                </div> 
            </div>


        </>
    );
};

export default Login;