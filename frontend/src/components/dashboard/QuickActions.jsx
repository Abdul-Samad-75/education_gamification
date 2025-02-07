import { Grid, Button } from '@mui/material';
import {
  QuizOutlined,
  EmojiEventsOutlined,
  LeaderboardOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const actions = [
  {
    title: 'Take Quiz',
    icon: <QuizOutlined />,
    path: '/quizzes',
    color: 'primary',
  },
  {
    title: 'View Badges',
    icon: <EmojiEventsOutlined />,
    path: '/badges',
    color: 'secondary',
  },
  {
    title: 'Leaderboard',
    icon: <LeaderboardOutlined />,
    path: '/leaderboard',
    color: 'success',
  },
  {
    title: 'Profile',
    icon: <AccountCircleOutlined />,
    path: '/profile',
    color: 'info',
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {actions.map((action, index) => (
        <Grid item xs={6} sm={3} key={action.title}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
          >
            <Button
              variant="contained"
              color={action.color}
              startIcon={action.icon}
              onClick={() => navigate(action.path)}
              fullWidth
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {action.title}
            </Button>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickActions;
