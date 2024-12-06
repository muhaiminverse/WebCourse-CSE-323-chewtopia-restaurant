import { FaBook, FaCalendar, FaCircle, FaHome, FaList, FaMailBulk, FaPhone, FaSearch, FaShoppingCart, FaStar, FaUser, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const DashBoard = () => {
    const [cart] = useCart()

    // get admin values from database
    const [isAdmin] = useAdmin()

    return (
        <div className="flex">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400 text-stone-800 ">
                <ul className="menu p-4">
                    {
                        isAdmin ? // tarnary conditions 
                            <>
                                {/* admin options */}
                                <li>
                                    <NavLink to='/dashboard/adminHome'>
                                        <FaHome className="mr-1 " />
                                        Admin Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addItems'>
                                        <FaUtensils className="mr-1 " />
                                        Add Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageItems'>
                                        <FaList className="mr-1 " />
                                        Manages Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/bookings'>
                                        <FaBook className="mr-1 " />
                                        Manages Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/users'>
                                        <FaUsers className="mr-1 " />
                                        All users
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                {/* users options */}
                                <li>
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome className="mr-1 " />
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/reservation'>
                                        <FaCalendar className="mr-1 " />
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/cart'>
                                        <FaShoppingCart className="mr-1 " />
                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/review'>
                                        <FaStar className="mr-1 " />
                                        Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/bookings'>
                                        <FaList className="mr-1 " />
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>

                    }
                    {/* divider */}
                    <div className="divider "></div>
                    {/* shared navlinks */}
                    <li>
                        <NavLink to='/'>
                            <FaHome className="mr-1 " />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            <FaSearch className="mr-1 " />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            <FaMailBulk className="mr-1 " />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-8">
                <Outlet>

                </Outlet>
            </div>
        </div>
    );
};

export default DashBoard;