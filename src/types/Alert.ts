export interface AlertContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
}

export interface Alert {
  message: string;
  type: 'success' | 'error' | 'info';
}
