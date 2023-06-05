"use client"

import React, { useMemo } from "react";
import type { AriaDialogProps } from "react-aria";
import { Overlay, useDialog, useModalOverlay } from "react-aria";
import type { OverlayTriggerState } from "@react-stately/overlays";
import { useRouter } from "next/navigation";

type DialogProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
} & AriaDialogProps & { state: OverlayTriggerState };

export function Dialog({ title, state, children, ...props }: DialogProps) {
  let ref = React.useRef(null);
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <Modal state={state}>
      <div {...dialogProps} ref={ref}>
        {title && <h3 {...titleProps}>{title}</h3>}
        {children}
      </div>
    </Modal>
  );
}

export function usePageModalState() {
  const router = useRouter();

  return useMemo(
    () => ({
      isOpen: true,
      open: () => {},
      setOpen: () => {},
      toggle: () => {},
      close: () => router.back(),
    }),
    [router]
  );
}

function Modal({
                 state,
                 children,
               }: {
  children: React.ReactNode;
  state: OverlayTriggerState;
}) {
  let ref = React.useRef(null);
  let { modalProps, underlayProps } = useModalOverlay(
    { isDismissable: true },
    state,
    ref
  );

  return state.isOpen ? (
    <Overlay>
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...underlayProps}
      >
        <div
          {...modalProps}
          ref={ref}
          className={"px-4 w-[94%] bg-gray-900 py-8 rounded-2xl"}
        >
          {children}
        </div>
      </div>
    </Overlay>
  ) : null;
}
