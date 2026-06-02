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
const permissions = [
  "MANAGE_UNIVERSITIES",
  "MANAGE_COLLEGES",
  "MANAGE_DEPARTMENTS",
  "MANAGE_CLASSROOMS",
  "MANAGE_STUDENTS",
  "CREATE_FORM",
  "EDIT_FORM",
  "DELETE_FORM",
  "VIEW_FORM",
  "SUBMIT_FORM",
  "APPROVE_FORM",
  "EXPORT_DATA",
  "VIEW_ANALYTICS"
];

for (const permission of permissions) {
  await prisma.permission.upsert({
    where: {
      name: permission
    },
    update: {},
    create: {
      name: permission
    }
  });
}
const superAdminRole = await prisma.role.upsert({
  where: {
    name: "SUPER_ADMIN"
  },
  update: {},
  create: {
    name: "SUPER_ADMIN",
    description: "Platform Super Administrator"
  }
});

const allPermissions =
  await prisma.permission.findMany();

for (const permission of allPermissions) {
  await prisma.rolePermission.upsert({
    where: {
      roleId_permissionId: {
        roleId: superAdminRole.id,
        permissionId: permission.id
      }
    },
    update: {},
    create: {
      roleId: superAdminRole.id,
      permissionId: permission.id
    }
  });
}

  const user = await prisma.user.upsert({
    where: {
      email: "admin@uniflow.com"
    },
    update: {},
    create: {
      tenantId: tenant.id,
      name: "Super Admin",
      email: "admin@uniflow.com",
      phone: "8888888888",
      password
    }
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: superAdminRole.id
      }
    },
    update: {},
    create: {
      userId: user.id,
      roleId: superAdminRole.id
    }
  });

  console.log("Seed completed");
}

main();