import bodyParser from "body-parser";
import express, { Router } from "express"
import router from "./routes/routes.js";


const App = express ();
const Port = 4500;

App.use(bodyParser.json());
App.use("/",router);






App.listen(Port, (err)=>{
    if(err) throw err;
    console.log(`le serveur et dispo sur le lien http://localhost:${Port}`);
})