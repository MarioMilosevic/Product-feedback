export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args); 
    }, delay);
  };
}
