import PropTypes from "prop-types";


const PartnerCart = ({partner}) => {
    const {name, logo, description} = partner
    return (
     
            <div className="border  rounded-full gap-3 flex items-center md:p-4 p-1 w-72 md:w-96">
            <img className="md:w-20 md:h-20 h-10 w-10 rounded-full object-cover border" src={logo} alt="" />
            <div>
                <h1 className="text-sm md:text-lg font-medium">{name}</h1>
                <p className="text-secondaryTextColor/70 md:text-base text-xs">{description}</p>
            </div>
        </div>
   
    );
};

PartnerCart.propTypes = {
    partner: PropTypes.object
}
export default PartnerCart;