export class LocalStorage<T> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  get(): T | null {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  delete() {
    localStorage.removeItem(this.key);
  }
}
