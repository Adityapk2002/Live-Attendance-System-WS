import express from "express";
import authRoutes from "./routes/authRoutes"
import dotenv from "dotenv"

const app = express();
app.use(express.json())
dotenv.config()

app.use('/auth', authRoutes);
app.use('/class')
app.use('/students')
app.use('/attendance')


app.get("/health",(req,res) => {
    res.json({
        success : true,
        message : "Sucessful api"
    });
});

app.listen(3000,() => {
    console.log("Listening on 3000"); 
})