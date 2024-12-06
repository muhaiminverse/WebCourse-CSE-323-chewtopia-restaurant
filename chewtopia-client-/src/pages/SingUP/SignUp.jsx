import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

// npm install react-hook-form
import Swal from 'sweetalert2'
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic() //'http://localhost:5000'
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    // redirect to previous page
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'


    const onSubmit = (data) => {
        // console.log(data) 
        createUser(data.email, data.password).then(res => {
            const loggedUser = res.user
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    // create user entry in database
                    const userInfo = {
                        name: data.name,
                        email: data.email
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user profile updated');
                                reset()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Profile created successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/') // redirect to previous page || from, { replace: true }
                            }
                        })

                })
                .catch(err => {
                    console.log(err);
                });

        })
    }

    console.log(watch("example")) // watch input value by passing the name of it


    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600 mt-3 label-text" >Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                {/* take it from imgbb: https://ibb.co.com/mJm9tCP */}
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="photoURL" className="input input-bordered" />
                                {errors.name && <span className="text-red-600 mt-3 label-text" >Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600 mt-2 label-text" >Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, maxLength: 6 })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <span className="text-red-600 mt-3 label-text" >Password is required</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="SignUp" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className="p-6"><small>Already have an account? <Link to='/login'>Log In</Link></small></p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default SignUp;