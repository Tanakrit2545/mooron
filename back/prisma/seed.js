const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const run = async () => {
  // User data with hashed passwords
  const userData = [
    {
      username: 'Ayaka',
      password: 'hashedPassword1', // Use the pre-hashed password
      email: 'Ayaka@gmail.com',
      firstName: 'Kamisato',
      lastName: 'Ayaka',
      address: '478/14',
      phoneNumber: '0984567456' // Enclosed in quotes to ensure it's treated as a string
    },
    {
      username: 'Raiden',
      password: 'hashedPassword2', // Use the pre-hashed password
      email: 'Raiden@gmail.com',
      firstName: 'Ei',
      lastName: 'Shogun',
      address: '876/11',
      phoneNumber: '0874561745' // Enclosed in quotes to ensure it's treated as a string
    }
  ];

  try {
    // Insert user data
    await prisma.customer.createMany({
      data: userData
    });

    console.log('Seed successful');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
};

run();
