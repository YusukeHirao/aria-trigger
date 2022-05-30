import { ARIA_CONTROLS } from "./const";
import {
  createDialogStyle,
  DialogPolyfillHook,
  isDialogElement,
  isSupported,
  toggleDialog,
} from "./dialog";
import { document, getAttribute, getElementById, searchElement } from "./dom";

export type ARIATriggerOptions = {
  dialogPolyfillHook?: DialogPolyfillHook;
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

      await toggleDialog(el, options?.dialogPolyfillHook);

      break;
    }
  });
};
