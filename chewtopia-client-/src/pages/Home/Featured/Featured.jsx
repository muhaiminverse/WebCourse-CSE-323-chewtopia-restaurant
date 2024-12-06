import SectionTitel from "../../../components/SectionTitel/SectionTitel";
import featuredImg from "../../../assets/home/featured.jpg"
import "../Featured/Featured.css"
const Featured = () => {
    return (
        <div className="featured-item text-white pt-8 my-20  ">
            <SectionTitel
                heading={'Featured Items'}
                subheading={'Check it out'}
            ></SectionTitel>

            <div className="md:flex justify-center pb-20 pt-20 px-36 items-center bg-zinc-800 bg-opacity-65 ">
                <div>
                    <img src={featuredImg} alt="" srcSet="" />
                </div>

                <div className="md:ml-10">
                    <p>Aug 20, 2025</p>
                    <p className="uppercase">Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Harum, animi? Dolorem, libero ad minus labore quis nesciunt nobis optio illum doloribus,
                        repudiandae ipsam maxime quidem repellendus nihil,
                        quibusdam hic ipsa?
                    </p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;