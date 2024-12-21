"user server"
import prisma from "@/lib/db"

interface student {
    name: string
    email: string
    role: string
    password: string
    }

export async function findStudent(name: string) {
  const findStudent = await prisma.user.findMany({
    where: {
      name : name
    }
  })
  return findStudent
}
