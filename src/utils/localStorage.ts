export class LocalStorage<T> {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  get(): T | null {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key));
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
