import { Injectable } from '@angular/core';
import { StorageEnum } from '../../shared/enums/storage.enum';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: StorageEnum): T | null {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : null;
  }

  setItem(key: StorageEnum, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
