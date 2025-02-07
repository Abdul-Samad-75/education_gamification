import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography, Box } from '@mui/material';
import {
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityList from '../components/dashboard/ActivityList';
import QuickActions from '../components/dashboard/QuickActions';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userBadges } = useSelector((state) => state.badge);
  const { userRank } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    // Fetch user data, badges, and rank
    // These actions will be implemented later
  }, [dispatch]);

  const stats = [
    {
      title: 'Quizzes Completed',
      value: user?.stats?.quizzesCompleted || 0,
      icon: <SchoolIcon />,
      color: 'primary',
    },
    {
      title: 'Badges Earned',
      value: userBadges?.length || 0,
      icon: <EmojiEventsIcon />,
      color: 'secondary',
    },
    {
      title: 'Current Rank',
      value: userRank?.rank || '-',
      icon: <TimelineIcon />,
      color: 'success',
    },
    {
      title: 'Total Points',
      value: user?.stats?.totalPoints || 0,
      icon: <StarIcon />,
      color: 'warning',
    },
  ];

  // Mock activities data (replace with real data later)
  const activities = [
    {
      id: 1,
      type: 'quiz',
      title: 'Mathematics Quiz',
      description: 'Completed with 85% score',
      timestamp: new Date(),
    },
    {
      id: 2,
      type: 'badge',
      title: 'Quick Learner Badge',
      description: 'Earned for completing 5 quizzes',
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Top 10 Rank',
      description: 'Reached top 10 in global leaderboard',
      timestamp: new Date(Date.now() - 172800000),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Welcome back, {user?.name || 'Student'}!
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          </Grid>
        ))}

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Box sx={{ my: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Quick Actions
            </Typography>
            <QuickActions />
          </Box>
        </Grid>

        {/* Activity List */}
        <Grid item xs={12}>
          <ActivityList activities={activities} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
