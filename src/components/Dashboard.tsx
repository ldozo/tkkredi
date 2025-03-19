import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  List as ListIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import rootStore from '../stores/RootStore';

const Dashboard: React.FC = observer(() => {
  const { uiStore, userStore, creditApplicationStore } = rootStore;
  const { applications } = creditApplicationStore;

  const handleNewApplication = () => {
    uiStore.setActiveTab('new-application');
  };

  const handleViewApplications = () => {
    uiStore.setActiveTab('applications');
  };

  // Calculate some statistics for the dashboard
  const totalApplications = applications.length;
  const pendingApplications = applications.filter((app) => app.status === 'pending').length;
  const approvedApplications = applications.filter((app) => app.status === 'approved').length;
  const totalApprovedAmount = applications
    .filter((app) => app.status === 'approved')
    .reduce((sum, app) => sum + app.amount, 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {!userStore.isLoggedIn ? (
        <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to TK Kredi
          </Typography>
          <Typography variant="body1" paragraph>
            Please log in to access your credit applications and apply for new loans.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              // For demo purposes, let's just log the user in with some dummy data
              userStore.setName('John Doe');
              userStore.setEmail('john.doe@example.com');
              userStore.login();
              
              // Show a welcome notification
              uiStore.addNotification({
                id: Date.now().toString(),
                message: 'Welcome back, John Doe!',
                type: 'info',
                createdAt: new Date().toISOString(),
                read: false,
              });
            }}
          >
            Log In
          </Button>
        </Paper>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Welcome back, {userStore.name}!
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Total Applications
                  </Typography>
                  <Typography variant="h4">{totalApplications}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Pending Applications
                  </Typography>
                  <Typography variant="h4">{pendingApplications}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Approved Applications
                  </Typography>
                  <Typography variant="h4">{approvedApplications}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom>
                    Total Approved Amount
                  </Typography>
                  <Typography variant="h4">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(totalApprovedAmount)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AddIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Apply for Credit</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Start a new credit application. Fill out your personal and financial information
                    to apply for a loan.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleNewApplication}>
                    Start Application
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ListIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">My Applications</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    View and manage your existing credit applications. Check the status of your
                    applications and view details.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleViewApplications}>
                    View Applications
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Credit Score</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Your credit score is an important factor in determining your eligibility for
                    loans and credit cards. A higher score can help you qualify for better interest
                    rates and terms.
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      my: 2,
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        width: 200,
                        height: 200,
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography variant="h3" component="div" color="primary">
                          720
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Good
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">View Credit Report</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
});

export default Dashboard;
