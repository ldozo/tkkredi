import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import rootStore from '../stores/RootStore';

// Validation schema for the credit application form
const validationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .min(1000, 'Amount must be at least 1,000')
    .max(1000000, 'Amount cannot exceed 1,000,000'),
  term: Yup.number()
    .required('Term is required')
    .min(3, 'Term must be at least 3 months')
    .max(120, 'Term cannot exceed 120 months'),
  purpose: Yup.string()
    .required('Purpose is required')
    .min(3, 'Purpose must be at least 3 characters'),
  personalInfo: Yup.object({
    fullName: Yup.string().required('Full name is required'),
    idNumber: Yup.string().required('ID number is required'),
    birthDate: Yup.string().required('Birth date is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  }),
  financialInfo: Yup.object({
    monthlyIncome: Yup.number()
      .required('Monthly income is required')
      .min(0, 'Monthly income cannot be negative'),
    employmentStatus: Yup.string().required('Employment status is required'),
    employerName: Yup.string().when('employmentStatus', {
      is: (status: string) => status === 'employed',
      then: (schema) => schema.required('Employer name is required'),
      otherwise: (schema) => schema.optional(),
    }),
    jobTitle: Yup.string().when('employmentStatus', {
      is: (status: string) => status === 'employed',
      then: (schema) => schema.required('Job title is required'),
      otherwise: (schema) => schema.optional(),
    }),
    employmentDuration: Yup.number().when('employmentStatus', {
      is: (status: string) => status === 'employed',
      then: (schema) => schema.required('Employment duration is required'),
      otherwise: (schema) => schema.optional(),
    }),
  }),
});

// Initial values for the form
const initialValues = {
  amount: 10000,
  term: 12,
  purpose: '',
  personalInfo: {
    fullName: '',
    idNumber: '',
    birthDate: '',
    address: '',
    phoneNumber: '',
  },
  financialInfo: {
    monthlyIncome: 0,
    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    employmentDuration: 0,
  },
};

const CreditApplicationForm: React.FC = observer(() => {
  const { creditApplicationStore } = rootStore;
  const { isLoading, error } = creditApplicationStore;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await creditApplicationStore.submitApplication(values);
        // Show success notification
        rootStore.uiStore.addNotification({
          id: Date.now().toString(),
          message: 'Credit application submitted successfully!',
          type: 'success',
          createdAt: new Date().toISOString(),
          read: false,
        });
        // Reset form
        formik.resetForm();
      } catch (error) {
        // Error handling is done in the store
        console.error('Failed to submit application:', error);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Credit Application
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* Loan Details Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Loan Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="Loan Amount"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="term"
            name="term"
            label="Loan Term (months)"
            type="number"
            value={formik.values.term}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.term && Boolean(formik.errors.term)}
            helperText={formik.touched.term && formik.errors.term}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth error={formik.touched.purpose && Boolean(formik.errors.purpose)}>
            <InputLabel id="purpose-label">Loan Purpose</InputLabel>
            <Select
              labelId="purpose-label"
              id="purpose"
              name="purpose"
              value={formik.values.purpose}
              label="Loan Purpose"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="home">Home Purchase</MenuItem>
              <MenuItem value="car">Vehicle Purchase</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="debt_consolidation">Debt Consolidation</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            {formik.touched.purpose && formik.errors.purpose && (
              <FormHelperText>{formik.errors.purpose as string}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Personal Information Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="personalInfo.fullName"
            name="personalInfo.fullName"
            label="Full Name"
            value={formik.values.personalInfo.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInfo?.fullName &&
              Boolean(formik.errors.personalInfo?.fullName)
            }
            helperText={
              formik.touched.personalInfo?.fullName && formik.errors.personalInfo?.fullName
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="personalInfo.idNumber"
            name="personalInfo.idNumber"
            label="ID Number"
            value={formik.values.personalInfo.idNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInfo?.idNumber &&
              Boolean(formik.errors.personalInfo?.idNumber)
            }
            helperText={
              formik.touched.personalInfo?.idNumber && formik.errors.personalInfo?.idNumber
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="personalInfo.birthDate"
            name="personalInfo.birthDate"
            label="Birth Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.personalInfo.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInfo?.birthDate &&
              Boolean(formik.errors.personalInfo?.birthDate)
            }
            helperText={
              formik.touched.personalInfo?.birthDate && formik.errors.personalInfo?.birthDate
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="personalInfo.phoneNumber"
            name="personalInfo.phoneNumber"
            label="Phone Number"
            value={formik.values.personalInfo.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInfo?.phoneNumber &&
              Boolean(formik.errors.personalInfo?.phoneNumber)
            }
            helperText={
              formik.touched.personalInfo?.phoneNumber && formik.errors.personalInfo?.phoneNumber
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="personalInfo.address"
            name="personalInfo.address"
            label="Address"
            value={formik.values.personalInfo.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personalInfo?.address &&
              Boolean(formik.errors.personalInfo?.address)
            }
            helperText={
              formik.touched.personalInfo?.address && formik.errors.personalInfo?.address
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Financial Information Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Financial Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="financialInfo.monthlyIncome"
            name="financialInfo.monthlyIncome"
            label="Monthly Income"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            value={formik.values.financialInfo.monthlyIncome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.financialInfo?.monthlyIncome &&
              Boolean(formik.errors.financialInfo?.monthlyIncome)
            }
            helperText={
              formik.touched.financialInfo?.monthlyIncome &&
              formik.errors.financialInfo?.monthlyIncome
            }
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            error={
              formik.touched.financialInfo?.employmentStatus &&
              Boolean(formik.errors.financialInfo?.employmentStatus)
            }
          >
            <InputLabel id="employment-status-label">Employment Status</InputLabel>
            <Select
              labelId="employment-status-label"
              id="financialInfo.employmentStatus"
              name="financialInfo.employmentStatus"
              value={formik.values.financialInfo.employmentStatus}
              label="Employment Status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="employed">Employed</MenuItem>
              <MenuItem value="self-employed">Self-Employed</MenuItem>
              <MenuItem value="unemployed">Unemployed</MenuItem>
              <MenuItem value="retired">Retired</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
            {formik.touched.financialInfo?.employmentStatus &&
              formik.errors.financialInfo?.employmentStatus && (
                <FormHelperText>
                  {formik.errors.financialInfo?.employmentStatus as string}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>

        {formik.values.financialInfo.employmentStatus === 'employed' && (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="financialInfo.employerName"
                name="financialInfo.employerName"
                label="Employer Name"
                value={formik.values.financialInfo.employerName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.financialInfo?.employerName &&
                  Boolean(formik.errors.financialInfo?.employerName)
                }
                helperText={
                  formik.touched.financialInfo?.employerName &&
                  formik.errors.financialInfo?.employerName
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="financialInfo.jobTitle"
                name="financialInfo.jobTitle"
                label="Job Title"
                value={formik.values.financialInfo.jobTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.financialInfo?.jobTitle &&
                  Boolean(formik.errors.financialInfo?.jobTitle)
                }
                helperText={
                  formik.touched.financialInfo?.jobTitle && formik.errors.financialInfo?.jobTitle
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="financialInfo.employmentDuration"
                name="financialInfo.employmentDuration"
                label="Employment Duration (months)"
                type="number"
                value={formik.values.financialInfo.employmentDuration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.financialInfo?.employmentDuration &&
                  Boolean(formik.errors.financialInfo?.employmentDuration)
                }
                helperText={
                  formik.touched.financialInfo?.employmentDuration &&
                  formik.errors.financialInfo?.employmentDuration
                }
              />
            </Grid>
          </>
        )}
      </Grid>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ minWidth: 120 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Submit Application'}
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={() => formik.resetForm()}
          disabled={isLoading}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
});

export default CreditApplicationForm;
