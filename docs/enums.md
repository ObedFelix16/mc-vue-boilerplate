# Enums

When we need a set of named constants, we will create and store enums at `src/enums`.

## Examples

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

```ts
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}
```
