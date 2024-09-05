import addItem from "../userModels/Admin.js";


export const createItem = async(req,res)=>{
     try {
           
          const {title,price,offer_price,category} = req.body;
          const image = req.file?req.file.path:null;
          if(!title || !price || !offer_price || !category){
               return res.status(401).json({success:false,msg:"all fields should be filed"})
          }

          const newItem = new addItem({title,price,offer_price,category,image})
          await newItem.save();
          return res.status(201).json({success:true,msg:"item added successfully"})

     } catch (error) {
          console.log(error)
          return res.status(400).json({success:false,msg:`an eternal error occured ${error}`})
     }
};

export const getItem = async(req,res)=>{
     try {
          const items = await addItem.find()
          if(!items){
               return res.status(401).json({success:false,msg:"items not found"})
          }
          return res.status(201).json({success:true,msg:"all items are here",items})
     } catch (error) {
          console.log(error)
          return res.status(400).json({success:false,msg:`an eternal error occured ${error}`})
     }
}