import axios from "axios"
import { useEffect, useState } from "react"


function GetItem() {
  
  const [data,setData] = useState([])

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const items = await axios.get('http://localhost:3000/api/get-item')
        const val = items.data
        console.log(val)
        setData(val)
     } catch (error) {
      console.log(error)
      alert(error)
     }
    }
    
    fetchData();
  },[])

  return (
    <div>GetItem</div>
  )
}

export default GetItem