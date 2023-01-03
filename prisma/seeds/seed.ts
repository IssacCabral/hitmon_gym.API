import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

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

createRoles();
