import { prisma } from "@/database";
import { IngredientsTable } from "@/app/(bar)/ingredients/IngredientsTable";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function Ingredients(props: {
  searchParams: { q: string };
}) {
  const query = props.searchParams.q;
  const ingredients = await fetchIngredients(query);

  return (
    <div className={"h-full grid grid-rows-[auto_80vh_2rem] gap-2 pt-2"}>
      <Search query={query} />
      {ingredients.length === 0 ? (
        <div className={"flex w-full items-center justify-center"}>
          Nic nie znaleziono
        </div>
      ) : (
        <IngredientsTable ingredients={ingredients} />
      )}
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

function Search(props: { query: string }) {
  return (
    <form method="GET" className={"flex w-full justify-center px-2"}>
      <input
        name={"q"}
        className={
          "w-full rounded-xl border-2 border-white bg-gray-800 px-2 py-1 text-lg"
        }
        defaultValue={props.query}
        placeholder={"Szukaj..."}
      />
      <input hidden type={"submit"} />
    </form>
  );
}

function fetchIngredients(filter: string = "") {
  return prisma.ingredient.findMany({ where: { name: { contains: filter } } });
}
