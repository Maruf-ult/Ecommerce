import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
import MainPage from "./MainPage.jsx"


function Routerss() {
  return (
      <Router>
           
           <Routes>
                <Route path="/"element={<Home></Home>} />
                <Route path="/Login"element={<Login></Login>} />
                <Route path="/Home"element={<MainPage></MainPage>} />
           </Routes>

      </Router>
  )
}

export default Routerss