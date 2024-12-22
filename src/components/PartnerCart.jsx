import PropTypes from "prop-types";


const PartnerCart = ({partner}) => {
    const {name, logo, description} = partner
    return (
     
            <div className="border  rounded-full gap-3 flex items-center px-4 py-4 w-96">
            <img className="w-20 h-20 rounded-full object-cover border" src={logo} alt="" />
            <div>
                <h1 className="text-lg font-medium">{name}</h1>
                <p className="text-secondaryTextColor/70">{description}</p>
            </div>
        </div>
   
    );
};

PartnerCart.propTypes = {
    partner: PropTypes.object
}
export default PartnerCart;