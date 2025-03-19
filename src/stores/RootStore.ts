import { makeAutoObservable } from 'mobx';

// User store for managing user-related state
class UserStore {
  name: string = '';
  email: string = '';
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.name = '';
    this.email = '';
  }
}

// Credit application store for managing credit application-related state
class CreditApplicationStore {
  applications: CreditApplication[] = [];
  currentApplication: CreditApplication | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentApplication(application: CreditApplication | null) {
    this.currentApplication = application;
  }

  addApplication(application: CreditApplication) {
    this.applications.push(application);
  }

  updateApplication(id: string, updatedData: Partial<CreditApplication>) {
    const index = this.applications.findIndex(app => app.id === id);
    if (index !== -1) {
      this.applications[index] = { ...this.applications[index], ...updatedData };
      if (this.currentApplication?.id === id) {
        this.currentApplication = this.applications[index];
      }
    }
  }

  deleteApplication(id: string) {
    this.applications = this.applications.filter(app => app.id !== id);
    if (this.currentApplication?.id === id) {
      this.currentApplication = null;
    }
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  // Simulate fetching applications from an API
  async fetchApplications() {
    this.setLoading(true);
    this.setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just set some dummy data
      // In a real app, this would come from an API
      this.applications = [];
      
      this.setLoading(false);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Unknown error');
      this.setLoading(false);
    }
  }

  // Simulate submitting a new application
  async submitApplication(application: Omit<CreditApplication, 'id' | 'status' | 'createdAt'>) {
    this.setLoading(true);
    this.setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApplication: CreditApplication = {
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...application
      };
      
      this.addApplication(newApplication);
      this.setCurrentApplication(newApplication);
      this.setLoading(false);
      
      return newApplication;
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Unknown error');
      this.setLoading(false);
      throw error;
    }
  }
}

// UI store for managing UI-related state
class UIStore {
  activeTab: string = 'dashboard';
  isSidebarOpen: boolean = true;
  theme: 'light' | 'dark' = 'light';
  notifications: Notification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
  }

  addNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  clearNotifications() {
    this.notifications = [];
  }
}

// Type definitions
interface CreditApplication {
  id: string;
  amount: number;
  term: number; // in months
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  userId?: string;
  personalInfo?: {
    fullName: string;
    idNumber: string;
    birthDate: string;
    address: string;
    phoneNumber: string;
  };
  financialInfo?: {
    monthlyIncome: number;
    employmentStatus: string;
    employerName?: string;
    jobTitle?: string;
    employmentDuration?: number; // in months
  };
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
}

// Root store that combines all stores
class RootStore {
  userStore: UserStore;
  creditApplicationStore: CreditApplicationStore;
  uiStore: UIStore;

  constructor() {
    this.userStore = new UserStore();
    this.creditApplicationStore = new CreditApplicationStore();
    this.uiStore = new UIStore();
    makeAutoObservable(this);
  }
}

// Create a single instance of the store
const rootStore = new RootStore();

export default rootStore;
export { RootStore, UserStore, CreditApplicationStore, UIStore };
export type { CreditApplication, Notification };
