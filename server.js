const express = require('express')
const mongoose = require('mongoose')
const Product = require('./model/productModel')
const product = require('./model/productModel')
const app = express()

app.use(express.json())
//if you dont want to use json instead of url encoded
app.use(express.urlencoded({extended:false}))



//routes
app.get('/', (req,res)=>{
    res.send('Hello Nodde Api')

})
//2nd api
app.get('/backend', (req,res)=>{
    res.send('Hello blog Api my name is kuber')

})

//get data to fetch data from database

app.get('/products', async(req,res)=>{
try{
    const products = await Product.find({});
    res.status(200).json(products)
   }catch(error){
    res.status(500).json({message: error.message})

   }
})

//get data by-id from database 

app.get('/products/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
       }catch(error){
        res.status(500).json({message: error.message})
    
       }
    })

//post data to post data from post man to mongodb 
app.post('/products',async(req,res)=>{
   
    try{

        const product = await Product.create(req.body)
        res.status(200).json(product);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
    // console.log(req.body);
    // res.send(req.body)
})


//update or edit in data base

app.put('/products/:id',async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
         //we cannot find any product in database
         if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }catch(error){
        res.status(500).json({message:error.message});
      
    }
})


//delete a product

app.delete('/products/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})



 
app.listen(3000,()=>{
    console.log(`Node Api is running on port 3000`)
})


mongoose.connect('mongodb+srv://kuber0804:dw40SH2ATNXT6iFd@cluster0.ghs3cuq.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to Mongodb')
}).catch((error)=>{
    console.log(error)
})