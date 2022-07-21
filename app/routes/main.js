//~import modules
import { Router } from "express";
const router = Router();

import { renderHomePage } from "../controllers/mainController.js";

//~routers
router.get("/", renderHomePage);

export { router };
