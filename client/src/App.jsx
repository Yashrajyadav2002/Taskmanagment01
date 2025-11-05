import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import CreateUser from "./admin/CreateUser";
import AssignTask from "./admin/AssignTask";
import EmpDashBoard from "./pages/EmpDashBoard";
const App = ()=>{
    return(
        <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

          </Route>
        </Routes>
        <Routes>
          <Route path="admin-dashboard" element={<AdminDashBoard />}>
           <Route path="create-user" element={<CreateUser/>} />
           <Route path="assign-task" element={<AssignTask/>}/>

          </Route>
        </Routes>

        <Routes>
          <Route path="emp-dashboard" element={<EmpDashBoard/>}>
           
          
          </Route>

        </Routes>


      </BrowserRouter>
        </>
    )
}
 export default App;