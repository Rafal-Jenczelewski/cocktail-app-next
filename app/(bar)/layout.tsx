import { ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/utils/routing";

export default function BarLayout(props: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col justify-end divide-y-2">
      <nav className="grid h-12 w-full grid-cols-2 bg-[rgb(27,36,48)] text-yellow-500">
        {routes.map((link) => (
          <Link
            href={link.url}
            className={
              "flex h-full items-center justify-center text-primary-text"
            }
            key={link.url}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex-1 touch-none border-yellow-700">
        {props.children}
      </div>
    </div>
  );
}
