import express from "express";
import http from "http";
import cors from 'cors';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import morgan  from "morgan";
import helmet from "helmet";

//init a express server
const app = express();
// loading env variables
dotenv.config();

//creating a server. this is requried for express to listen to specific port.
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

//connecting the database
mongoose.connect(mongo_uri).then(()=>{
    console.log("Database is connected")
    
}).catch((err)=>{
    console.log(err);
});


// adding morgan middleware for logging.
app.use(morgan());

// adding helmet middleware for security.
app.use(helmet());

// adding cookie parser middleware this is requried when we work with cookies.
app.use(cookieParser());

// adding body parser middleware for parsing the request body. we can use express

app.use(bodyParser.json()); //express.json() is alternative to bodyParser.json()
app.use(bodyParser.urlencoded({ extended: true })); //express.urlencoded() is alternative to bodyParser.urlencoded()
app.use(bodyParser.text()); //express.text() is alternative to bodyParser.text()

// adding cors middleware for enableing cross origin request
app.use(cors(
    {
        origin:['*'],
        credentials: true
    }
));

//test route
app.get("/",(_req,res)=>{
    res.send("Hello World");
})

//starting the server
app.listen(port,()=>{
    console.log("Server started at port ",port);
})