// export function entryIsFile(
//   entry: WebKitFileEntry | WebKitDirectoryEntry
// ): entry is WebKitFileEntry {
//   return entry.isFile
// }

// export function entryIsDirectory(
//   entry: WebKitFileEntry | WebKitDirectoryEntry
// ): entry is WebKitDirectoryEntry {
//   return entry.isDirectory
// }

export class DropFile {
  private _dataUrl = ''

  public nativeFile: File
  public id: string = DropFile.idFactory()
  public accepted = false // Passed all validation.
  public lastModified: number
  public name: string
  public nameWithoutExtension: string
  public extension: string
  public processing = false
  public size: number
  public type: string
  public width = 0
  public height = 0
  public errorMessage = ''

  constructor(file: File) {
    this.nativeFile = file
    this.lastModified = file.lastModified
    this.name = file.name
    this.nameWithoutExtension = DropFile.getFileNameWithoutExtension(file.name)
    this.extension = DropFile.getFileExtension(file.name)
    this.size = file.size
    this.type = file.type
  }

  get dataUrl() {
    return this._dataUrl || ''
  }

  set dataUrl(value) {
    // Use non-enumerable data url to avoid copying around large data sets
    Object.defineProperty(this, '_dataUrl', {
      value,
      enumerable: false,
      configurable: true,
      writable: true,
    })
  }

  static idCounter = 0
  static idPrefix = 'drop_'

  static idFactory(): string {
    return `${DropFile.idPrefix}${++DropFile.idCounter}`
  }

  static getFileNameWithoutExtension(fileName: string): string {
    return fileName.substr(0, fileName.lastIndexOf('.')) || fileName
  }

  static getFileExtension(fileName: string): string {
    const extension = fileName.split('.').pop()
    return extension ? extension.toLowerCase() : ''
  }
}
