import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@afmall.az' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@afmall.az',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })
  
  // Create Categories
  const fashion = await prisma.category.upsert({
    where: { name: 'Fashion & Clothing' },
    update: {},
    create: { name: 'Fashion & Clothing' },
  })
  
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics' },
  })
  
  const dining = await prisma.category.upsert({
    where: { name: 'Dining & Food Court' },
    update: {},
    create: { name: 'Dining & Food Court' },
  })

  // Create Stores
  await prisma.store.create({
    data: {
      name: 'Zara',
      description: 'The latest fashion trends for women, men and kids.',
      categoryId: fashion.id,
      location: 'Floor 1, Shop 101-105',
      logo: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      phone: '+994 12 555 12 34',
    }
  })

  await prisma.store.create({
    data: {
      name: 'Apple Store',
      description: 'Explore the latest iPhone, Mac, iPad, and Apple Watch.',
      categoryId: electronics.id,
      location: 'Floor 2, Shop 201',
      logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    }
  })
  
  await prisma.store.create({
    data: {
      name: 'Starbucks',
      description: 'More than just great coffee. Explore the menu, sign up for Starbucks Rewards.',
      categoryId: dining.id,
      location: 'Ground Floor, G-12',
      logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80',
    }
  })

  // Create Events
  await prisma.event.create({
    data: {
      title: 'Summer Mega Sale',
      description: 'Up to 70% off on all fashion brands! Do not miss out.',
      startDate: new Date('2026-06-01T00:00:00Z'),
      endDate: new Date('2026-08-31T23:59:59Z'),
      imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80',
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
