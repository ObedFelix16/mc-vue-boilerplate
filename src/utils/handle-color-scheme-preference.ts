/**
 * Detect if the user has set their system to use a light or dark color theme.
 * Uses the `prefers-color-scheme` CSS media feature.
 *
 * When `prefers-color-scheme` has no support, the default color scheme handler will be used.
 * Support: https://caniuse.com/#feat=prefers-color-scheme
 *
 * @param handlers An object with color scheme keys and their corresponding activation handler.
 * @param defaultScheme The default color scheme if `prefers-color-scheme` is not supported.
 * @returns A dispose function that removes all the media query listeners that were added.
 */
function handleColorSchemePreference(
  handlers: Record<string, (scheme: string) => void>,
  defaultScheme = 'no-preference',
  schemes: string[] = ['no-preference', 'light', 'dark']
): () => void {
  const schemeMqlList: { mql: MediaQueryList; listener: () => void }[] = []

  for (const scheme of schemes) {
    const schemeHandler = handlers[scheme]

    if (!schemeHandler) continue

    const schemeMql = window.matchMedia(`(prefers-color-scheme: ${scheme})`)

    const schemeMqlListener = () => schemeMql.matches && schemeHandler(scheme)

    schemeMqlListener()

    schemeMql.addEventListener('change', schemeMqlListener)

    schemeMqlList.push({ mql: schemeMql, listener: schemeMqlListener })
  }

  if (schemeMqlList.length === 0) {
    const defaultSchemeHandler = handlers[defaultScheme]
    if (defaultSchemeHandler) defaultSchemeHandler(defaultScheme)
  }

  return () => {
    for (const scheme of schemeMqlList) {
      scheme.mql.removeListener(scheme.listener)
    }
  }
}

export default handleColorSchemePreference
