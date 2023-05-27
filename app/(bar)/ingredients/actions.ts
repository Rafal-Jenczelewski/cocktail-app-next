"use server";

import { Ingredient } from "@prisma/client";
import { prisma } from "@/database";
import { revalidatePath } from "next/cache";

export async function editIngredient(
  id: Ingredient["id"],
  data: Pick<Ingredient, "available" | "name">
) {
  await prisma.ingredient.update({ where: { id }, data });
  revalidatePath("/ingredients");
}
