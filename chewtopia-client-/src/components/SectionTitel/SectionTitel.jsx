

const SectionTitel = ({heading, subheading}) => {
    return (
        <div className="md:w-3/12 my-8 text-center mx-auto ">
            <p className="text-yellow-600 mb-2">--- {subheading} ---</p>
            <h3 className="text-3xl uppercase border-y py-2">{heading}</h3>
        </div> 
    );
};

export default SectionTitel;