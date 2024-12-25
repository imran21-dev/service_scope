import { LuMail } from "react-icons/lu";


const NewsLetter = () => {
    return (
        <div className="md:w-10/12 mx-3 md:mx-auto py-10 mb-20">
            <div className="bg-secondaryTextColor/5 w-max mx-auto  p-4 rounded-badge">
            <LuMail className="text-6xl bg-white text-pColor p-5 rounded-3xl"/>
            </div>
            <h1 className="text-xl md:text-3xl pt-5 bg-gradient-to-br from-pColor to-purple-600 mx-auto w-max bg-clip-text text-transparent font-semibold text-center pb-5">Join Service Scope Newsletter!</h1>
            <div className="border md:w-2/4 mx-3 md:mx-auto rounded-full flex items-center justify-between">
                <input type="email" 
                placeholder="enter your email"
                className="bg-transparent indent-3 flex-1 md:py-4 px-2 md:px-5 md:text-lg text-sm focus:outline-none"
                />
                <button className="btn text-xs md:text-sm rounded-full md:px-7 md:mr-2 bg-gradient-to-br from-pColor to-purple-600 text-white">Join Now!</button>
            </div>
            <p className="md:w-2/4 text-center mx-auto pt-3 text-sm px-5 text-secondaryTextColor/70">Subscribe to our newsletter and never miss out on trusted reviews, expert recommendations, and top-rated services delivered right to your inbox.</p>
        </div>
    );
};

export default NewsLetter;