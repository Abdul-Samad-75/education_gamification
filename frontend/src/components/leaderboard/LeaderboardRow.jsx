import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Whatshot as FireIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const LeaderboardRow = ({ user, rank, isCurrentUser }) => {
  const getPositionColor = (position) => {
    switch (position) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return 'transparent';
    }
  };

  const getRankIcon = (position) => {
    if (position <= 3) {
      return <TrophyIcon sx={{ color: getPositionColor(position) }} />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <ListItem
        sx={{
          mb: 1,
          borderRadius: 2,
          bgcolor: isCurrentUser ? 'primary.light' : 'background.paper',
          '&:hover': {
            bgcolor: isCurrentUser ? 'primary.light' : 'action.hover',
          },
        }}
      >
        {/* Rank */}
        <Box
          sx={{
            minWidth: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {getRankIcon(rank) || (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: isCurrentUser ? 'primary.main' : 'text.secondary',
              }}
            >
              {rank}
            </Typography>
          )}
        </Box>

        {/* Avatar and Name */}
        <ListItemAvatar>
          <Avatar
            src={user.avatar}
            sx={{
              bgcolor: isCurrentUser ? 'primary.main' : 'secondary.main',
              border: isCurrentUser ? '2px solid' : 'none',
              borderColor: 'primary.main',
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: isCurrentUser ? 'bold' : 'normal',
                color: isCurrentUser ? 'primary.main' : 'text.primary',
              }}
            >
              {user.name}
            </Typography>
          }
          secondary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                size="small"
                icon={<FireIcon sx={{ fontSize: '1rem' }} />}
                label={`${user.streak} day streak`}
                color={isCurrentUser ? 'primary' : 'default'}
                variant={isCurrentUser ? 'filled' : 'outlined'}
              />
            </Box>
          }
        />

        {/* Points */}
        <Box
          sx={{
            minWidth: 100,
            textAlign: 'right',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: isCurrentUser ? 'primary.main' : 'text.primary',
            }}
          >
            {user.points}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            points
          </Typography>
        </Box>
      </ListItem>
    </motion.div>
  );
};

export default LeaderboardRow;
