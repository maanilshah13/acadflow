import prisma from "../../config/prisma";

export const createUniversity = async (
  data: {
    name: string;
    code: string;
    slug: string;
  }
) => {
  return prisma.tenant.create({
    data,
  });
};

export const getUniversities = async () => {
  return prisma.tenant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};