import {Outlet} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Layout =()=>{
    return(
        < >
        <Header/>
        <div id="wrapper" className="flex-grow-1"> <Outlet/></div>

        <Footer/>        
        </>
    )
}
 export default Layout;