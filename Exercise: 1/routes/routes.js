import { Router } from "express";
import MyControllers from "../controller/controller.js";

const router = Router();



router.get("/all", MyControllers.getAllBooks);
router.get(":id", MyControllers.GetUserby_ID)
router.post("/create" , MyControllers.create_Book);
router.put("/update/:id" , MyControllers.UpdateBooks);


export default router;