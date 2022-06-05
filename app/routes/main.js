//~import modules
import { Router } from "express";
const router = Router();

import { renderHomePage } from "../controllers/mainController.js";

//~routers
router.post("/", renderHomePage);

export { router };
