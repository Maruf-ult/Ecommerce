import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"

import Login from "./Login.jsx"
import Home from "./Home.jsx"



function Routerss() {
  return (
      <Router>
           
           <Routes>
                <Route path="/"element={<Home></Home>} />
                <Route path="/Login"element={<Login></Login>} />
           </Routes>

      </Router>
  )
}

export default Routerss