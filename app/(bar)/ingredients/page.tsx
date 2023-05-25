import { prisma } from "@/database";
import { IngredientsTable } from "@/app/(bar)/ingredients/IngredientsTable";

export default async function Ingredients() {
  const ingredients = await prisma.ingredient.findMany();
  return (
    <div className={"h-full"}>
      <IngredientsTable ingredients={ingredients} />
    </div>
  );
}
