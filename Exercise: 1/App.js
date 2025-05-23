import express from "express";
import router from "./routes/routes.js";
import bodyParser from "body-parser";


const App = express();
const port = 4000;
App.use("/", router);
App.use(bodyParser.json());
  





App.listen(port, (err) => {
    if (err) throw err;
    console.log(`server is available on port link http://localhost:${port}`);
});