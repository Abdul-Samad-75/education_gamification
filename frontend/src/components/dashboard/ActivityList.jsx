import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from '@mui/material';
import {
  QuizOutlined,
  EmojiEventsOutlined,
  StarOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const getActivityIcon = (type) => {
  switch (type) {
    case 'quiz':
      return <QuizOutlined />;
    case 'badge':
      return <EmojiEventsOutlined />;
    case 'achievement':
      return <StarOutlined />;
    default:
      return <StarOutlined />;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'quiz':
      return 'primary.main';
    case 'badge':
      return 'secondary.main';
    case 'achievement':
      return 'warning.main';
    default:
      return 'info.main';
  }
};

const ActivityList = ({ activities = [] }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        height: '100%',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Recent Activities
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={activity.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {activity.description}
                      </Typography>
                      {' — '}
                      {new Date(activity.timestamp).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && <Divider variant="inset" component="li" />}
            </>
          </motion.div>
        ))}
        {activities.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
            No recent activities
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default ActivityList;
