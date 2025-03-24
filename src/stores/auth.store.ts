import { makeAutoObservable } from "mobx";

interface User {
  id: string;
  email: string;
  name: string;
  departmentId: string;
  departmentName: string;
}

class AuthStore {
  token: string | null = null;
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    // LocalStorage'dan user bilgisini yükle
    const userStr = localStorage.getItem("user");
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }

  getUser(): User | null {
    return this.user;
  }

  clearAuth() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export const authStore = new AuthStore();
