import { LuMail } from "react-icons/lu";


const NewsLetter = () => {
    return (
        <div className="w-10/12 mx-auto py-10 mb-20">
            <div className="bg-secondaryTextColor/5 w-max mx-auto  p-4 rounded-badge">
            <LuMail className="text-6xl bg-white text-pColor p-5 rounded-3xl"/>
            </div>
            <h1 className="text-3xl pt-5 bg-gradient-to-br from-pColor to-purple-600 mx-auto w-max bg-clip-text text-transparent font-semibold text-center pb-5">Join Service Scope Newsletter!</h1>
            <div className="border w-2/4 mx-auto rounded-full flex items-center justify-between">
                <input type="email" 
                placeholder="enter your email"
                className="bg-transparent flex-1 py-4 px-5 text-lg focus:outline-none"
                />
                <button className="btn rounded-full px-7 mr-2 bg-gradient-to-br from-pColor to-purple-600 text-white">Join Now!</button>
            </div>
            <p className="w-2/4 text-center mx-auto pt-3 text-sm px-5 text-secondaryTextColor/70">Subscribe to our newsletter and never miss out on trusted reviews, expert recommendations, and top-rated services delivered right to your inbox.</p>
        </div>
    );
};

export default NewsLetter;