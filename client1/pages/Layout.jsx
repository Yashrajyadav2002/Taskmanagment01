import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";


const Layout=()=>{
    return(
        <>
          <Header/>

         <div id="wrapper">
        
           <Outlet/>

         </div>
       
          <Footer/>
        </>
    )
}

export default Layout;