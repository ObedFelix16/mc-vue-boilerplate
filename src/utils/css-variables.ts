/**
 * Gives a CSS custom property value applied at the element
 * element {Element}
 * varName {String} without '--'
 *
 * For example:
 * readCssVar(document.querySelector('.box'), 'color');
 */
export function readCssVar(element: Element, varName: string): string {
  const elementStyles = getComputedStyle(element)
  return elementStyles.getPropertyValue(`--${varName}`).trim()
}

/**
 * Writes a CSS custom property value at the element
 * element {Element}
 * varName {String} without '--'
 *
 * For example:
 * readCssVar(document.querySelector('.box'), 'color', 'white');
 */
export function writeCssVar(
  element: HTMLElement,
  propertyName: string,
  value: string | null,
  priority?: string
): void {
  return element.style.setProperty(`--${propertyName}`, value, priority)
}
