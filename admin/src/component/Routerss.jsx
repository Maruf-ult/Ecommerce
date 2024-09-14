import { BrowserRouter as Router ,Route,Routes } from "react-router-dom"
import AddItem from "./AddItem.jsx"
import GetItem from "./GetItem.jsx"
import UpdateItem from "./UpdateItem.jsx"
function Routerss() {
  return (
     <Router>
           <Routes>
                <Route path="/" element={<AddItem></AddItem>} />
                <Route path="/get-item" element={<GetItem></GetItem>}/>
                <Route path="/update-item" element={<UpdateItem></UpdateItem>}/>
           </Routes>
     </Router>
  )
}

export default Routerss