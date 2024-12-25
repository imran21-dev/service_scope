import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../provider/ContextApi";
import { LoadingBarContainer } from "react-top-loading-bar";



const MainLayout = () => {
    const {blockScroll} = useContext(ThemeContext)
    return (
        <LoadingBarContainer>

        <div className={blockScroll ? 'h-screen overflow-y-hidden' : ''}>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
        </LoadingBarContainer>
    );
};

export default MainLayout;