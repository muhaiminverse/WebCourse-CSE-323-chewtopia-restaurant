import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";


const Main = () => {
    const currentLocation = useLocation()
    // console.log(currentLocation)
    
    const noHeader_and_footer = location.pathname.includes('login') || location.pathname.includes('signup')

    return (
        <div>
            { noHeader_and_footer || <NavBar></NavBar>}
            <Outlet></Outlet>
            { noHeader_and_footer || <Footer></Footer>}
        </div> 
    );
};

export default Main;