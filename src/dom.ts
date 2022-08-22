export const document = window.document;
export const getElementById = (id: string) => document.getElementById(id);
export const createElement = (name: string) => document.createElement(name);
export const setAttribute = (el: Element, attr: string, value: string) =>
  el.setAttribute(attr, value);
export const getAttribute = (el: Element, attr: string) =>
  el.getAttribute(attr);
export const removeAttribute = (el: Element, attr: string) =>
  el.removeAttribute(attr);
export const querySelectorAll = (el: Element, selector: string) =>
  el.querySelectorAll(selector);
export const querySelector = (el: Element, selector: string) =>
  el.querySelector(selector);

export const searchElement = (
  el: EventTarget | null,
  selector: string
): HTMLElement | SVGElement | null => {
  if (!el || !(el instanceof HTMLElement || el instanceof SVGElement)) {
    return null;
  }
  if (el.matches(selector)) {
    return el;
  }
  return el.closest(selector);
};
