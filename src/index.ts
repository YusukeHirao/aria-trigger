import { ARIA_CONTROLS, ARIA_EXPANDED } from "./const";
import {
  createDialogStyle,
  DialogPolyfillHook,
  isDialogElement,
  isSupported,
  toggleDialog,
} from "./dialog";
import {
  document,
  getAttribute,
  getElementById,
  removeAttribute,
  searchElement,
  setAttribute,
} from "./dom";

export { closeDialog } from "./dialog";

export type ARIATriggerOptions = {
  dialogPolyfillHook?: DialogPolyfillHook;
  toggleAriaExpandedDialogTrigger?: boolean;
  onChangeDialog?: (state: "opened" | "closed") => void;
};

export const trigger = (options?: ARIATriggerOptions) => {
  if (!isSupported) {
    createDialogStyle();
  }

  // Event delegation
  document.addEventListener("click", async (ev: MouseEvent) => {
    const btn = searchElement(ev.target, `button[${ARIA_CONTROLS}]`);
    if (!btn) {
      return;
    }

    const targetIDs = getAttribute(btn, ARIA_CONTROLS)?.split(/\s+/) || [];
    const targetElements = targetIDs.map(getElementById);

    for (const el of targetElements) {
      if (!isDialogElement(el)) {
        continue;
      }

      toggleDialog(
        el,
        (opened) => {
          if (options?.onChangeDialog) {
            options.onChangeDialog(opened ? "opened" : "closed");
          }

          if (options?.toggleAriaExpandedDialogTrigger ?? true) {
            if (opened) {
              setAttribute(btn, ARIA_EXPANDED, "true");
            } else {
              removeAttribute(btn, ARIA_EXPANDED);
            }
          }
        },
        options
      );

      break;
    }
  });
};
