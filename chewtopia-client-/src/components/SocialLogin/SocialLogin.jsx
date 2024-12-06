// import { FaGoogle } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import { useLocation, useNavigate } from "react-router-dom";


// const SocialLogin = () => {
//     const { googleSignIn } = useAuth()
//     const axiosPublic = useAxiosPublic() // anyone can access
//     const navigate = useNavigate()
//     const location = useLocation()

    
//     const handleGoogleSignIn = () => {
//         googleSignIn()
//             .then(result => {
//                 console.log(result.user);
//                 const userInfo = {
//                     email: result.user?.email,
//                     name: result.user?.displayName
//                 }
//                 axiosPublic.post('/users', userInfo)
//                     .then(res => {
//                         console.log(res.data);
//                         navigate(from, { replace: location } || '/')
//                     }) 
//             })
//             .catch( (err) => {
//                 console.log(err);
                
//             })
//     }

//     return (
//         <div className="p-4 flex justify-center">
//             <div className="divider"></div>
//             <button onClick={handleGoogleSignIn} className="btn w-full bg-blue-500">
//                 <FaGoogle className="mr-2" ></FaGoogle>
//                 Google
//             </button>
//         </div>
//     );
// };

// export default SocialLogin;





import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic(); // anyone can access
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // Fix for the 'from' redirection

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                
                // Check if result.user exists before accessing its properties
                if (result && result.user) {
                    console.log(result.user);
                    const userInfo = {
                        email: result.user.email,
                        name: result.user.displayName
                    };
                    // Post the user info to your API
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            console.log(res.data);
                            // Use the 'from' location for redirection or default to home page
                            navigate(from, { replace: true });
                        })
                        .catch(err => {
                            console.error('Error saving user:', err);
                        });
                } else {
                    console.error("No user info available in result:", result);
                }
            })
            .catch(err => {
                console.error('Google sign-in error:', err);
            });
    };

    return (
        <div className="p-4 flex justify-center">
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn w-full bg-blue-500">
                <FaGoogle className="mr-2" ></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default SocialLogin;
