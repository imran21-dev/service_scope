import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../provider/ContextApi";
import { LoadingBarContainer } from "react-top-loading-bar";
import Footer from "../components/Footer";



const MainLayout = () => {
    const {blockScroll} = useContext(ThemeContext)
    return (
        <LoadingBarContainer>

        <div className={blockScroll ? 'h-screen overflow-y-hidden' : ''}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
        </LoadingBarContainer>
    );
};

export default MainLayout;