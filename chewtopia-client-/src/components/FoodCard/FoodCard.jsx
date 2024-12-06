import React, { useContext } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';
// npm install axios

const FoodCard = ({ item }) => {
    const { image, price, recipe, name, _id } = item
    const navigate = useNavigate() // redirect to previous page if not logged in
    const location = useLocation() // redirect to previous page if not logged in
    const axiosSecure = useAxiosSecure() // using axios secure
    const { user } = useAuth() // firebase authentication using 'useContext(AuthContext)' to access
    const [, refetch] = useCart() // cart items, more fuction work with tanStact library || we're useing refetch

    const handleAddToCart = () => {
        // console.log(user.email);

        if (user && user.email) {
            // send cart item to the DB
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post('/carts', cartItem) // sending to backend
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch the cart to update the cart items count 
                        refetch() // bug: dosn't update instantly 
                    }

                })

        }
        else {
            // alert user to log in
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in, to add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send user to login page
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <p className='bg-slate-900 text-white absolute right-0 mr-2 -mt-48 rounded-md p-2 px-6'>${price}</p>
                <img src={image} alt="Food Category Tab" />
            </figure>
            <div className="card-body items-center flex flex-col ">
                <h2 className="card-title ">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        // if the user has not logged in we don't let them to add to cart 
                        onClick={handleAddToCart}
                        className="btn btn-outline bg-slate-100 text-black border-orange-400 border-0 border-b-4 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;