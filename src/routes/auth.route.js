import express from "express";

import { signinController, signupController, logoutController, checkController } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/signup", signupController );
router.post("/signin", signinController);
router.post("/signout", logoutController );



router.get("/check", protectRoute, checkController);



export default router;