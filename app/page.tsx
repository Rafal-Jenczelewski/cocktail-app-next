import Link from "next/link";
import { routes } from "@/utils/routing";

export default async function Home() {
  return (
    <main className={"flex h-full w-full flex-col items-center justify-start"}>
      <h1 className="px-4 pt-16 text-center text-6xl font-extrabold tracking-tight">
        <span className="block uppercase text-primary-text drop-shadow-md">
          Apka do drinków
        </span>
      </h1>
      <div className="my-auto flex h-64 w-full flex-col items-center justify-evenly">
        {routes.map((link) => (
          <div key={link.url} className="mx-32 w-80 max-w-sm">
            <Link
              href={link.url}
              className="grow-1 flex items-center justify-center rounded-md border border-transparent bg-primary-bg px-4 py-3 text-xl font-medium text-white shadow-xl active:bg-yellow-800 sm:px-8"
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
