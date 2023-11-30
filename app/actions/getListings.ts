import { PrismaClient } from "@prisma/client"

export async function getStaticProps() {
  const prisma = new PrismaClient()
  const listings = await prisma.listing.findMany()
  
  return listings;
}