import { makeAutoObservable } from "mobx";

class LoaderStore {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }
}

export const loaderStore = new LoaderStore();
