import { BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
import MainPage from "./MainPage.jsx"
import Fashion from "./Fashion.jsx"
import Mobile from "./Mobile.jsx"
import Laptop from "./Laptop.jsx"
import Books from "./Books.jsx"
import SavedItems from "./SavedItems.jsx"
import LikedItems from "./LikedItems.jsx"
import AddedItems from "./AddedItems.jsx"

function Routerss() {
  return (
      <Router>
           
           <Routes>
                <Route path="/"element={<Home></Home>} />
                <Route path="/Login"element={<Login></Login>} /> 
                <Route path="/Home"element={<MainPage></MainPage>} />
                <Route path="/Fashion" element={<Fashion></Fashion>}/>
                <Route path="/Mobile" element={<Mobile></Mobile>}/>
                <Route path="/Laptop" element={<Laptop></Laptop>}/>
                <Route path="/Books" element={<Books></Books>}/>
                <Route path="/liked-items" element={<LikedItems></LikedItems>}/>
                <Route path="/saved-items" element={<SavedItems></SavedItems>}/>
                <Route path="/added-items" element={<AddedItems></AddedItems>}/>
           </Routes>

      </Router>
  )
}

export default Routerss