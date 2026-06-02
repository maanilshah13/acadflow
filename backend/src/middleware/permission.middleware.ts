import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";

export const authorize =
  (...requiredPermissions: string[]) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const permissions =
        user.roles.flatMap((userRole) =>
          userRole.role.permissions.map(
            (rp) => rp.permission.name
          )
        );

      const hasPermission =
        requiredPermissions.every(
          (permission) =>
            permissions.includes(permission)
        );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization failed",
      });
    }
  };