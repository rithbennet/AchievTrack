// /src/data/dummyData.ts

export const USERS = Array.from({ length: 50 }, (_, index) => ({
  id: BigInt(index + 1),
  created_at: new Date(),
  Username: `user${index + 1}`,  // Changed to uppercase
  Name: `User ${index + 1}`,      // Changed to uppercase
  Password: "password123",
  Role: index % 2 === 0 ? "Admin" : "Member", // Changed to uppercase
}));
