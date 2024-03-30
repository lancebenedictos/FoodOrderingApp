import express from "express";
import UserController from "../controllers/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

router.post("/", jwtCheck, UserController.createCurrentUser);

router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  UserController.updateCurrentUser
);

router.get("/", jwtCheck, jwtParse, UserController.getCurrentUser);
export default router;
