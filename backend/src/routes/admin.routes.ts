import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("SUPER_ADMIN"),
  async (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Super Admin"
    });
  }
);

export default router;