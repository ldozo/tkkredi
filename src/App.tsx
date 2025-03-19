import React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CreditApplicationForm from './forms/CreditApplicationForm';
import CreditApplicationList from './components/CreditApplicationList';
import rootStore from './stores/RootStore';

const App: React.FC = observer(() => {
  const { uiStore } = rootStore;
  const { activeTab, theme } = uiStore;

  // Create a theme instance based on the user's preference
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  // Render the appropriate component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'new-application':
        return <CreditApplicationForm />;
      case 'applications':
        return <CreditApplicationList />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Layout>
        {renderContent()}
      </Layout>
    </ThemeProvider>
  );
});

export default App;
