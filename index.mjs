import express from "express";
const app = express()
const port = 3000
import restaurants from './routes/restaurants.mjs' 

//MIDDLEWARE
app.use(express.json()) // this allows is to use req.body
app.use('/restaurants', restaurants)

// Error Handling Middleware
app.use((err, req, res, next)=>{
    res.status(500).send("Something went wrong!")
})

app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
})