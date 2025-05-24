import { Router } from "express";
import Controller from "../controller2/controller.js"

const router = Router ();

router.get("/alluser", Controller.getAll_user);
router.get("/yy",Controller.getStatus);
router.get("/:id",Controller.Getuser_By_Id);
router.post("/create",Controller.Create_User);
router.post("/update/:id",Controller.Update_UserBy_ID);
router.delete("/delete/:id",Controller.Delete_userBy_id);


export default router ;