import { Router } from "express";
import Controller from "../controller2/controller.js"

const router = Router ();

router.get("/alluser", Controller.getAll_user);
router.get("/:id",Controller.Getuser_By_Id);
router.post("/create",Controller.Create_User);


export default router ;