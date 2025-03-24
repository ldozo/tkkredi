import { makeAutoObservable, runInAction } from "mobx";
import { UserService } from "../services/user.service";
import { User } from "../types/user.types";

export class UserStore {
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUsers = (users: User[]) => {
    this.users = users;
  };

  setLoading = (loading: boolean) => {
    this.loading = loading;
  };

  setError = (error: string | null) => {
    this.error = error;
  };

  fetchUsers = async () => {
    this.setLoading(true);
    this.setError(null);
    try {
      const response = await UserService.getUsers();
      runInAction(() => {
        if (response.success && Array.isArray(response.data)) {
          this.setUsers(response.data);
        } else {
          console.error("Invalid response format:", response);
          this.setError("Geçersiz veri formatı");
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.setError("Kullanıcılar yüklenirken bir hata oluştu");
        console.error("Error fetching users:", err);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };
}

export const userStore = new UserStore();
