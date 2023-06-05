"use client"

import { Dialog, usePageModalState } from "@/components/Dialog";

export default function NewIngredient() {
  const state = usePageModalState();
  return <Dialog state={state}>New</Dialog>;
}
