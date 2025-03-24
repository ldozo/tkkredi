import { makeAutoObservable } from "mobx";

class AuthStore {
  token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }
}

export const authStore = new AuthStore();
