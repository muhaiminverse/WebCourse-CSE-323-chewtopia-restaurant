import SectionTitel from '../../../components/SectionTitel/SectionTitel';
import MenuItem from '../../../components/MenuItem/MenuItem';
import useMenu from '../../../Hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu([])
    const popular = menu.filter(item => item.category === 'popular')

    // const [menu, setMenu] = useState([])

    // useEffect( () => {
    //     fetch('menu.json')
    //     .then( res => res.json() )
    //     .then( data => {
    //         const populatItems = data.filter( item => item.category === 'popular')
    //         setMenu(populatItems)
    //     } )
    // }, [] )

    return (
        <section className='mb-12'>
            <SectionTitel
            heading={"From Our Menus"}
            subheading={"Popular Items"}
            ></SectionTitel>

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
        </section>
    );
};

export default PopularMenu;