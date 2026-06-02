import { Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "./auth.middleware";

export const authorize =
  (...roles: string[]) =>
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.userId;

      const userRoles =
        await prisma.userRole.findMany({
          where: {
            userId
          },
          include: {
            role: true
          }
        });

      const roleNames =
        userRoles.map(
          (item) => item.role.name
        );

      const allowed =
        roles.some(
          (role) =>
            roleNames.includes(role)
        );

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error"
      });
    }
  };