import { ReactNode } from "react";

export default function IngredientsLayout(props: {
  children: ReactNode;
  actionModal: ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.actionModal}
    </>
  );
}
