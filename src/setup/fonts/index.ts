import resources from './resources'

export interface FontDescriptor {
  style: 'normal' | 'italic'
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

export interface FontResource {
  family: string
  source: string
  format: 'opentype' | 'truetype' | 'woff' | 'woff2'
  descriptors: FontDescriptor
}

initFontEnhancement()

function createFontFace(font: FontResource, fallback: any) {
  if (fallback)
    return `
@font-face {
  font-family: "${font.family}";
  src: url('${font.source}') format('${font.format}');
  font-weight: ${font.descriptors.weight}
}
      `
  return new (window as any).FontFace(
    font.family,
    `url(${font.source})`,
    font.descriptors
  )
}
function createFontObserver(FontFaceObserver: any, font: FontResource) {
  return new FontFaceObserver(font.family, {
    weight: font.descriptors.weight,
  })
}

function getFontFaces(fallback: any) {
  return resources.map((r) => createFontFace(r, fallback))
}

function loadFontsWithObserverAsync(FontFaceObserver: any) {
  return resources.map((r) => createFontObserver(FontFaceObserver, r).load())
}

async function loadFontFacesAsync() {
  const fallback = typeof (window as any).FontFace === 'undefined'
  const fontFaces = getFontFaces(fallback)

  if (fallback) {
    try {
      const FontFaceObserver = await import(
        /* webpackChunkName: 'fontfaceobserver' */ 'fontfaceobserver'
      )

      if (document.head) {
        const newStyle = document.createElement('style')

        fontFaces.forEach((fontFace) => {
          newStyle.appendChild(document.createTextNode(fontFace))
        })

        document.head.appendChild(newStyle)
      }

      await Promise.all(loadFontsWithObserverAsync(FontFaceObserver))
    } catch (error) {
      // Silently fail if font face observer is not supported.
    }
  } else if ((document as any).fonts) {
    fontFaces.forEach((fontFace) => {
      const doc = document as any
      doc.fonts.add(fontFace)
      fontFace.load()
    })

    await (document as any).fonts.ready
  }
}

function initFontEnhancement() {
  if (!document.documentElement) return

  const fontsEnhancementClass = 'fonts-enhancement'
  const fontsLoadingClass = `${fontsEnhancementClass}--loading`
  const fontsLoadedClass = `${fontsEnhancementClass}--loaded`
  const fontsFailedClass = `${fontsEnhancementClass}--failed`
  const htmlClassList = document.documentElement.classList

  try {
    htmlClassList.add(fontsEnhancementClass, fontsLoadingClass)

    loadFontFacesAsync()

    htmlClassList.add(fontsLoadedClass)
  } catch (error) {
    htmlClassList.add(fontsFailedClass)
  } finally {
    htmlClassList.remove(fontsLoadingClass)
  }
}
