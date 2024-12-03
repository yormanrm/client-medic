import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setSessionItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionItem(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeSessionItem(key: string) {
    sessionStorage.removeItem(key);
  }

  setLocalItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  removeLocalItem(key: string) {
    localStorage.removeItem(key);
  }
}