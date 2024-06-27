import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export const prisma = new PrismaClient()
