import { Router } from "express";
import { login } from "./auth.controller";
import { me } from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post(
  "/login",
  login
);

export default router;
router.get(
  "/me",
  authenticate,
  me
);