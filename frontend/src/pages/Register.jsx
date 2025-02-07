import { useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  Link,
  Box,
  Avatar,
} from '@mui/material';
import { PersonAddOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { register } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/layout/AuthLayout';
import FormTextField from '../components/form/FormTextField';
import LoadingButton from '../components/form/LoadingButton';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  const handleSubmit = async (values) => {
    try {
      const { confirmPassword, ...registerData } = values;
      await dispatch(register(registerData)).unwrap();
      enqueueSnackbar('Registration successful!', { variant: 'success' });
      navigate('/login');
    } catch (error) {
      // Error is handled by the auth slice
    }
  };

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PersonAddOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Create your account
      </Typography>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormTextField
                name="name"
                label="Full Name"
                autoComplete="name"
                autoFocus
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormTextField
                name="email"
                label="Email Address"
                autoComplete="email"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormTextField
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={isLoading || isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </LoadingButton>
            </motion.div>

            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
