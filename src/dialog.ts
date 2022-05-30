import {
  ARIA_LABELLEDBY,
  ARIA_MODAL,
  DIALOG,
  HAS_TABINDEX_SELECTOR,
  TABINDEX,
  TRUE,
} from "./const";
import dialogStyle from "./dialog-default.css";
import {
  createElement,
  document,
  getAttribute,
  getElementById,
  querySelector,
  querySelectorAll,
  removeAttribute,
  setAttribute,
} from "./dom";

export type DialogPolyfillHook = (el: HTMLDialogElement) => void;

const DIALOG_STYLE_ID = "dialog-style";

const initializedElementStack = new WeakSet<HTMLElement>();
const focusableElements = new Map<Element, string>();

const spec = createElement(DIALOG);
// @ts-ignore
export const isSupported = "show" in spec && typeof spec.show === "function";

export const isDialogElement = (
  el: Element | null
): el is HTMLDialogElement => {
  return el?.localName === DIALOG;
};

export const toggleDialog = async (
  el: HTMLDialogElement,
  polyfillHook?: DialogPolyfillHook
) => {
  await dialogInitialize(el, polyfillHook);

  const isModal = getAttribute(el, ARIA_MODAL) === TRUE;

  // @ts-ignore
  if (el.open) {
    // @ts-ignore
    el.close();
    if (isModal) {
      unsetInert();
    }
    return;
  }

  if (isModal) {
    // @ts-ignore
    el.showModal();
    setInert(el);
  } else {
    // @ts-ignore
    el.show();
  }
};

export const createDialogStyle = () => {
  if (getElementById(DIALOG_STYLE_ID)) {
    return;
  }
  const style = createElement("style");
  style.id = DIALOG_STYLE_ID;
  style.textContent = dialogStyle;
  document.head.append(style);
};

/**
 * Sets the inert to the back layer
 */
const setInert = (el: HTMLDialogElement) => {
  if (isSupported) {
    return;
  }

  // Stores current tabindex values
  querySelectorAll(el, HAS_TABINDEX_SELECTOR).forEach((el) => {
    const tabindex = getAttribute(el, TABINDEX);
    if (tabindex == null) {
      return;
    }
    focusableElements.set(el, tabindex);
  });

  // Set inert
  // @ts-ignore
  document.body.inert = true;

  // Restores tabindex values and removes the tabindex attribute for the focusable elements
  querySelectorAll(el, HAS_TABINDEX_SELECTOR).forEach((el) => {
    const tabindex = focusableElements.get(el);
    if (tabindex == null) {
      removeAttribute(el, TABINDEX);
      return;
    }
    setAttribute(el, TABINDEX, tabindex);
  });
  focusableElements.forEach((tabindex, el) => {
    setAttribute(el, TABINDEX, tabindex);
  });
};

/**
 * Remove the inert from the back layer
 */
const unsetInert = () => {
  if (isSupported) {
    return;
  }

  // @ts-ignore
  document.body.inert = false;
};

const dialogInitialize = async (
  el: HTMLDialogElement,
  polyfillHook?: DialogPolyfillHook
) => {
  const initialized = initializedElementStack.has(el);
  if (initialized) {
    return;
  }

  if (!isSupported) {
    if (polyfillHook) {
      polyfillHook(el);
    }
    createDialogStyle();
  }

  // Binds the aria-labelledby property
  const label = querySelector(el, 'h1,h2,h3,h4,h5,h6,[role="heading"]');
  if (label) {
    const labelId = label.id || `${el.id}__label__${Date.now()}`;
    label.id = labelId;
    setAttribute(el, ARIA_LABELLEDBY, labelId);
  }

  initializedElementStack.add(el);
};
