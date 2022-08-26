# ARIA Trigger

## Concept

**The ARIA Driven Implements**

```html
<button type="button" aria-controls="DIALOG_ID">Open Dialog</button>

<dialog id="DIALOG_ID" aria-modal="true">
  <h2>Dialog Title</h2>
  <p>lorem ipsum...</p>
  <button type="button" aria-controls="DIALOG_ID">Close</button>
</dialog>
```

If it clicks the button that has the `aria-controls` attribute, the related dialog is opened.
A developer doesn't need to write JavaScript codes.
They only should confirm to match the ID of the dialog and the `aria-controls`.

Ordinarily, a developer needs to write JavaScript codes if using the dialog element.
It must call the `show` or `showModal` method to open, and must call the `close` method to close it.

But in the solution, It calls the `showModal` method automatically if the `aria-modal` property is `true`,
else it calls the `show` method automatically.

## Usage

```sh
$ npm i -S @yusukehirao/aria-trigger
```

```js
import { trigger } from "@yusukehirao/aria-trigger";

window.addEventListener("DOMContentLoaded", () => trigger());
```

Supports Safari version under 15.4.

### With `dialog-polyfill` and `wicg-inert`

- [`dialog-polyfill`](https://github.com/GoogleChrome/dialog-polyfill)
- [`wicg-inert`](https://github.com/WICG/inert)

```js
import dialogPolyfill from "dialog-polyfill";
import "wicg-inert";

import { trigger } from "@yusukehirao/aria-trigger";

window.addEventListener("DOMContentLoaded", () =>
  trigger({
    dialogPolyfillHook: dialogPolyfill.registerDialog,
  })
);
```

## Options

### `dialogPolyfillHook`

See the section [With `dialog-polyfill` and `wicg-inert`](#with-dialog-polyfill-and-wicg-inert).

### `toggleAriaExpandedDialogTrigger`

Whether changes the aria-expanded state on the trigger button when opening the dialog.

### `onChangeDialog`

```js
trigger({
  /**
   * @param {"opened" | "closed"} state
   */
  onChangeDialog(state) {
    console.log(state); // Output "opened" or "closed".
  },
});
```
