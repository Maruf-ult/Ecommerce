import { BrowserRouter as Router ,Route,Routes } from "react-router-dom"
import AddItem from "./AddItem.jsx"
import GetItem from "./GetItem.jsx"
function Routerss() {
  return (
     <Router>
           <Routes>
                <Route path="/" element={<AddItem></AddItem>} />
                <Route path="/get-item" element={<GetItem></GetItem>}/>
           </Routes>
     </Router>
  )
}

export default Routerss