import { Router } from "express";

import { adminRoute } from "./test.controller";

import { authenticate } from "../../middleware/auth.middleware";

import { authorize } from "../../middleware/permission.middleware";

import { PERMISSIONS } from "../../constants/permissions";

const router = Router();

router.get(
  "/admin",
  authenticate,
  authorize(
    PERMISSIONS.MANAGE_UNIVERSITIES
  ),
  adminRoute
);

export default router;