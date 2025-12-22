import express from "express";
import dotenv from "dotenv"

const app = express();
app.use(express.json())
dotenv.config()

app.get("/health",(req,res) => {
    res.json({
        success : true,
        message : "Sucessful api"
    });
});

app.listen(3000,() => {
    console.log("Listening on 3000"); 
})