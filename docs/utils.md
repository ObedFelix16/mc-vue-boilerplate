# Utils

Under the `src/utils` folder we store all the utility functions that are useful throughout the app.

```ts
export function entryIsFile(
  entry: WebKitFileEntry | WebKitDirectoryEntry
): entry is WebKitFileEntry {
  return entry.isFile
}
```
