import prisma from "../config/prisma";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash(
    "Admin@123",
    10
  );

  const tenant = await prisma.tenant.upsert({
  where: {
    slug: "uniflow"
  },
  update: {},
  create: {
    name: "UniFlow Demo University",
    slug: "uniflow",
    code: "UFLOW"
  }
});

  const role = await prisma.role.upsert({
    where: {
      name: "SUPER_ADMIN"
    },
    update: {},
    create: {
      name: "SUPER_ADMIN"
    }
  });

  const user = await prisma.user.upsert({
    where: {
      email: "admin@uniflow.com"
    },
    update: {},
    create: {
      tenantId: tenant.id,
      name: "Super Admin",
      email: "admin@uniflow.com",
      phone: "9999999999",
      password
    }
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: role.id
      }
    },
    update: {},
    create: {
      userId: user.id,
      roleId: role.id
    }
  });

  console.log("Seed completed");
}

main();