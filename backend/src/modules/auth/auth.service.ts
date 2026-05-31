import prisma from "../../config/prisma";
import { comparePassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt";

export const loginService = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid =
    await comparePassword(
      password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken =
    generateAccessToken({
      userId: user.id,
      email: user.email,
    });

  const refreshToken =
    generateRefreshToken({
      userId: user.id,
    });

  return {
    user,
    accessToken,
    refreshToken,
  };
};