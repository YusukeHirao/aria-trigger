import dialog from "dialog-polyfill";
import { closeDialog, trigger } from ".";

window.addEventListener("DOMContentLoaded", () => {
  trigger({
    dialogPolyfillHook: dialog.registerDialog,
    onChangeDialog(state) {
      document.body.setAttribute("data-dialog-state", state);
    },
  });

  matchMedia("(max-width: 640px)").addEventListener("change", (e) => {
    const mql = e.target as MediaQueryList;

    if (mql.matches) {
      // Force close
      closeDialog();
    }
  });
});
