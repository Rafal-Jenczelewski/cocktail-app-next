import { prisma } from "@/database";
import { IngredientsTable } from "@/app/(bar)/ingredients/IngredientsTable";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function Ingredients(props: {
  searchParams: { q: string };
}) {
  const q = props.searchParams.q;
  const ingredients = await fetchIngredients(q);
  return (
    <div className={"flex h-full flex-col gap-2 pt-2"}>
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
      <div className={"flex flex-grow items-center justify-center"}>
        <Link
          href={"ingredients/new"}
          className={"flex w-[20%] justify-center"}
        >
          <FaPlus size={"1.5rem"} />
        </Link>
      </div>
    </div>
  );
}

function fetchIngredients(filter: string = "") {
  return prisma.ingredient.findMany({ where: { name: { contains: filter } } });
}
