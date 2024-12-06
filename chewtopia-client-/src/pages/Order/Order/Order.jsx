import { useState } from 'react';
import oderCover from '../../../assets/shop/order.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // npm install --save react-tabs react-tabs
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../Hooks/useMenu';
import FoodCard from '../../../components/FoodCard/FoodCard';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    // when we click from the menu we then go to tab of the category of that specific food 
    const categories  = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabindex, setTabindex] = useState(initialIndex)

    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Order </title>
            </Helmet>
            <Cover img={oderCover} titel="Order" ></Cover>
            <Tabs defaultIndex={tabindex} onSelect={(index) => setTabindex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Desseret</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert} ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} ></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;