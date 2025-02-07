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
import { LockOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { login } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/layout/AuthLayout';
import FormTextField from '../components/form/FormTextField';
import LoadingButton from '../components/form/LoadingButton';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, isLoading } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [error, enqueueSnackbar]);

  const handleSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the auth slice
    }
  };

  return (
    <AuthLayout>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Sign in to EduGame
      </Typography>

      <Formik
        initialValues={{
          email: '',
          password: '',
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
                name="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormTextField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={isLoading || isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
            </motion.div>

            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
