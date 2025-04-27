import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertContextType } from '../types/Alert';


const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showSuccess = (message: string) => {
    setAlert({ message, type: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

  const showError = (message: string) => {
    setAlert({ message, type: 'error' });
    setTimeout(() => setAlert(null), 3000);
  };

  const showInfo = (message: string) => {
    setAlert({ message, type: 'info' });
    setTimeout(() => setAlert(null), 3000);
  };


  return (
    <AlertContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}

      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor:
                alert.type === 'success'
                  ? 'green'
                  : alert.type === 'error'
                    ? 'red'
                    : '#6c757d',
              color: 'white',
              fontWeight: 'bold',
              zIndex: 1000
            }}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

    </AlertContext.Provider>
  );
};
