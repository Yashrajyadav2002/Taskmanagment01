import { Link, Outlet } from "react-router-dom";
const EmpDashBoard=()=>{
    return(
        <>
        <div id="empheader">
            <h1> Employee DashBoard</h1>
        </div>
        <div id="empcontent">
           <div id="empmenu">
              <Link to="mytask" className="empmenu">My Taks</Link>
               <br /><br />
               <Link to="mytask" className="empmenu">My Taks</Link>
               <br /><br />
                <Link to="mytask" className="empmenu">My Taks</Link>
               <br /><br />
                <Link to="submitedtask" className="empmenu">Submited Taks</Link>
               <br /><br />
            
             </div>
           <div id="empdata"> 
              <Outlet/>
             </div>
        </div>
          
        </>
    )
}

export default EmpDashBoard;