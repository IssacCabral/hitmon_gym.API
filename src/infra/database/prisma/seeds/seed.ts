import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();

async function createRoles() {
  const ADMIN_ROLE = await prismaClient.role.upsert({
    create: {
      id: '757f238c-3772-41ec-a13e-2997cf2f977f',
      type: 'ADMIN',
      description: 'special access',
    },
    update: {
      id: '757f238c-3772-41ec-a13e-2997cf2f977f',
      type: 'ADMIN',
      description: 'special access',
    },
    where: { id: '757f238c-3772-41ec-a13e-2997cf2f977f' },
  });
  const STUDENT_ROLE = await prismaClient.role.upsert({
    create: {
      id: '8ba60c01-06f4-4056-971c-f45613719f90',
      type: 'STUDENT',
      description: 'gym student permissions',
    },
    update: {
      id: '8ba60c01-06f4-4056-971c-f45613719f90',
      type: 'STUDENT',
      description: 'gym student permissions',
    },
    where: { id: '8ba60c01-06f4-4056-971c-f45613719f90' },
  });
  const INSTRUCTOR_ROLE = await prismaClient.role.upsert({
    create: {
      id: '449cb099-c662-4119-9c8b-5e8e3c688dd7',
      type: 'INSTRUCTOR',
      description: 'gym instructor permissions',
    },
    update: {
      id: '449cb099-c662-4119-9c8b-5e8e3c688dd7',
      type: 'INSTRUCTOR',
      description: 'gym instructor permissions',
    },
    where: { id: '449cb099-c662-4119-9c8b-5e8e3c688dd7' },
  });
}

async function createAdmin() {
  const adminRole = await prismaClient.role.findFirst({
    where: { type: 'ADMIN' },
  });

  const adminData = {
    email: 'admin@email.com',
    password: bcrypt.hashSync('Abc#123', 12),
    username: 'admin_123',
    accountVerificationCode: null,
    accountVerificationCodeExpiresAt: null,
  };

  await prismaClient.user.upsert({
    create: {
      id: 'b458b208-cec9-43e7-a9e6-3e9f9c44de4c',
      ...adminData,
      registrationStep: 'VERIFIED',
      roles: { connect: { id: adminRole.id } },
    },
    update: {
      id: 'b458b208-cec9-43e7-a9e6-3e9f9c44de4c',
      ...adminData,
      roles: { connect: { id: adminRole.id } },
    },
    where: { id: 'b458b208-cec9-43e7-a9e6-3e9f9c44de4c' },
  });
}

async function createInstructor() {
  const instructorRole = await prismaClient.role.findFirst({
    where: { type: 'INSTRUCTOR' },
  });

  const instructorData = {
    email: 'instructor@email.com',
    password: bcrypt.hashSync('Abc#123', 12),
    username: 'instructor_123',
    accountVerificationCode: null,
    accountVerificationCodeExpiresAt: null,
  };

  await prismaClient.user.upsert({
    create: {
      id: 'b4060d32-7318-475d-95fc-7ee34c4ead87',
      ...instructorData,
      registrationStep: 'VERIFIED',
      roles: { connect: { id: instructorRole.id } },
    },
    update: {
      id: 'b4060d32-7318-475d-95fc-7ee34c4ead87',
      ...instructorData,
      roles: { connect: { id: instructorRole.id } },
    },
    where: { id: 'b4060d32-7318-475d-95fc-7ee34c4ead87' },
  });
}

async function createStudent() {
  const studentRole = await prismaClient.role.findFirst({
    where: { type: 'STUDENT' },
  });

  const studentData = {
    email: 'student@email.com',
    password: bcrypt.hashSync('Abc#123', 12),
    username: 'student_123',
    accountVerificationCode: null,
    accountVerificationCodeExpiresAt: null,
  };

  await prismaClient.user.upsert({
    create: {
      id: '5bc45b78-2698-4320-86a1-3b600cf3ab51',
      ...studentData,
      registrationStep: 'VERIFIED',
      roles: { connect: { id: studentRole.id } },
    },
    update: {
      id: '5bc45b78-2698-4320-86a1-3b600cf3ab51',
      ...studentData,
      roles: { connect: { id: studentRole.id } },
    },
    where: { id: '5bc45b78-2698-4320-86a1-3b600cf3ab51' },
  });
}

createRoles();
createAdmin();
createInstructor();
createStudent();
