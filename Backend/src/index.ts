import express from "express";
import authRoutes from "./routes/authRoutes"
import classRoutes from "./routes/classRoutes"
import dotenv from "dotenv"
import { connectDB } from "./config/db";

const app = express();
app.use(express.json())
dotenv.config()
connectDB()

app.use('/auth', authRoutes);
app.use('/class',classRoutes)
// app.use('/students')
// app.use('/attendance')


app.get("/health",(req,res) => {
    res.json({
        success : true,
        message : "Sucessful api"
    });
});

app.listen(3000,() => {
    console.log("Listening on 3000"); 
})