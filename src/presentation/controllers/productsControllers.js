import ProductManager from "../../domain/managers/productsManager.js";
import uploader from "../middlewares/multer.js";


class ProductController
{
    static list = async (req,res)=>{

        const manager = new ProductManager();

        const products = await manager.find();

        res.send ({status:'succeed',products})
    }
}

export const getOne= async (req,res,next) =>{

    try
    {
    
    const {id} = req.params;

    const manager = new ProductManager();

    const product = await manager.getOne(id);

    res.send ({status:'succeed',product});
    }
    catch (e)
    {
        next (e)
    }

}

export const save = async (req,res,next) =>{

    try{

    const manager = new ProductManager();

    const product = await manager.create(req.body);

    res.send ({status:'succeed',product, message:'Product created'});
    }
    catch (e)
    {
        next(e)
    }
}


export const update = async ( req,res,next)=>{

    try 
    {
        const {id} = req.params

        const manager = new ProductManager();
    
        const result = await manager.updateOne(id, req.body);
    
        res.send({ status: 'success', result, message: 'Product updated' })
    }
    catch (e)
    {
        next(e)
    }

}

export const deleteOne = async (req,res,next) =>{

    try
    {

    const {id} = req.params

    const manager = new ProductManager();

    const result = await manager.deleteOne(id);

    res.send({ status: 'success', result, message: 'Product deleted' });
    }
    catch (e)
    {
        next (e)
    }
}

// export const addImageById = async (req,res)=>
// {

//     const {id} = req.params;

//     const file = req.file;

//     const manager = new ProductManager();

//     const result = await manager.addImageById(id,'aaa') ;

    
// }

export default ProductController