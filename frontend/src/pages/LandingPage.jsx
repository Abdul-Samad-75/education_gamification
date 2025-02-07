import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  School,
  EmojiEvents,
  Timeline,
  Psychology,
  GroupAdd,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Psychology sx={{ fontSize: 40 }} />,
    title: 'Interactive Quizzes',
    description: 'Engage with dynamic quizzes across various subjects to test and enhance your knowledge.',
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 40 }} />,
    title: 'Achievement Badges',
    description: 'Earn badges and rewards as you progress through your learning journey.',
  },
  {
    icon: <Timeline sx={{ fontSize: 40 }} />,
    title: 'Progress Tracking',
    description: 'Monitor your learning progress with detailed analytics and performance metrics.',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Competitive Learning',
    description: 'Compete with peers on the leaderboard and challenge yourself to improve.',
  },
  {
    icon: <GroupAdd sx={{ fontSize: 40 }} />,
    title: 'Community Learning',
    description: 'Join a community of learners and share your knowledge and achievements.',
  },
  {
    icon: <School sx={{ fontSize: 40 }} />,
    title: 'Personalized Learning',
    description: 'Adaptive learning paths that adjust to your progress and preferences.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: { xs: 8, md: 12 } }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                component="h1"
                color="white"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Learn, Achieve, Compete
              </Typography>
              <Typography
                variant="h5"
                color="white"
                sx={{
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  opacity: 0.9,
                }}
              >
                Transform your learning experience with gamification. Make education fun and engaging!
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.9),
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: alpha('#fff', 0.1),
                    },
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component="img"
                src="/hero-image.svg"
                alt="Education Illustration"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  display: 'block',
                  margin: 'auto',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 8, fontWeight: 'bold' }}
              color="primary"
            >
              Why Choose Us?
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            color: 'primary.main',
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          align="center"
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          align="center"
                          color="text.secondary"
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              color="white"
              sx={{ mb: 3, fontWeight: 'bold' }}
            >
              Ready to Start Learning?
            </Typography>
            <Typography
              variant="h6"
              color="white"
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Join thousands of students who are already experiencing the future of education.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: alpha('#fff', 0.9),
                },
                px: 4,
                py: 1.5,
              }}
            >
              Get Started Now
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
