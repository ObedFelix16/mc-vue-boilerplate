# TypeScript Types

Under the `src/types` folder we store custom TypeScript types.

## Example

```ts
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  currentTarget: T
}
```
