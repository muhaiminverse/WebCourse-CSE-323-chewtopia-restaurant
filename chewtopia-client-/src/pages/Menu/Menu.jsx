import { Helmet } from 'react-helmet-async'; // Titel of the web tab 
import Cover from '../Shared/Cover/Cover';
import menuImg from '../../assets/menu/menu-bg.png'
import desseretImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import PopularMenu from '../Home/PopularMenu/PopularMenu';
import useMenu from '../../Hooks/useMenu';
import SectionTitel from '../../components/SectionTitel/SectionTitel';
import MenuCategory from './MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Bistro Menu | Menu </title>
            </Helmet>
            {/* main cover */}
            <Cover
                img={menuImg}
                titel={"Our Menu"} // common mistake: you must keep the key_name same as the parameter of the component
                ></Cover>
            {/*Offers */}
            <SectionTitel subheading={"Don't miss"} heading={"todays offer"}></SectionTitel>
            <MenuCategory items={offered} ></MenuCategory>
            {/*desserts */}
            <MenuCategory items={dessert} title={'dessert'} coverImg={desseretImg} ></MenuCategory>
            {/*pizza */}
            <MenuCategory items={pizza} title={'pizza'} coverImg={pizzaImg} ></MenuCategory>
            {/*salad */}
            <MenuCategory items={salad} title={'salad'} coverImg={saladImg} ></MenuCategory>
            {/*soup */}
            <MenuCategory items={soup} title={'soup'} coverImg={soupImg} ></MenuCategory>
        </div>
    );
};

export default Menu;