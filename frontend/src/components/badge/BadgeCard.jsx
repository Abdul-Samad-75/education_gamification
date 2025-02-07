import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Avatar,
} from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const BadgeCard = ({ badge, isEarned }) => {
  const {
    name,
    description,
    imageUrl,
    progress = 0,
    requirement,
    points,
  } = badge;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          filter: isEarned ? 'none' : 'grayscale(1)',
          opacity: isEarned ? 1 : 0.7,
          transition: 'all 0.3s ease',
          '&:hover': {
            filter: 'none',
            opacity: 1,
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          {/* Badge Icon */}
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto 16px',
              bgcolor: isEarned ? 'secondary.main' : 'action.disabledBackground',
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt={name} style={{ width: '60%', height: '60%' }} />
            ) : (
              <TrophyIcon sx={{ width: '60%', height: '60%' }} />
            )}
          </Avatar>

          {/* Badge Details */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              minHeight: 40,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>

          {/* Points */}
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ mb: 1, fontWeight: 'bold' }}
          >
            {points} Points
          </Typography>

          {/* Progress */}
          {!isEarned && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                Progress: {progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 6, borderRadius: 1 }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 0.5 }}
              >
                {requirement}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BadgeCard;
