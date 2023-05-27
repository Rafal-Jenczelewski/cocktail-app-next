import { prisma } from "@/database";
import { IngredientsTable } from "@/app/(bar)/ingredients/IngredientsTable";

export default async function Ingredients(props: {
  searchParams: { q: string };
}) {
  const q = props.searchParams.q;
  const ingredients = await useIngredients(q);
  return (
    <div className={"flex h-full flex-col pt-2"}>
      <form method="GET" className={"flex w-full justify-center px-2"}>
        <input
          name={"q"}
          className={
            "w-full rounded-xl border-2 border-white bg-gray-800 px-2 py-1 text-lg"
          }
          defaultValue={q}
          placeholder={"Szukaj..."}
        />
        <input hidden type={"submit"} />
      </form>
      <IngredientsTable ingredients={ingredients} />
    </div>
  );
}

function useIngredients(filter: string = "") {
  return prisma.ingredient.findMany({ where: { name: { contains: filter } } });
}
