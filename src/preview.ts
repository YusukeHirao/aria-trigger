import dialog from "dialog-polyfill";
import { trigger } from ".";

window.addEventListener("DOMContentLoaded", () =>
  trigger({
    dialogPolyfillHook: dialog.registerDialog,
  })
);
