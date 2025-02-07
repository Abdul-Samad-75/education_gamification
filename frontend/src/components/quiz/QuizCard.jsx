import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  Timer as TimerIcon,
  QuestionAnswer as QuestionIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuizCard = ({ quiz, userProgress }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    category,
    difficulty,
    timeLimit,
    questionCount,
    points,
  } = quiz;

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'warning';
    return 'primary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Chip
              icon={<CategoryIcon />}
              label={category}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label={difficulty}
              color={getDifficultyColor(difficulty)}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label={`${points} Points`}
              color="secondary"
              size="small"
              sx={{ mb: 1 }}
            />
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimerIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {timeLimit} minutes
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <QuestionIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {questionCount} questions
            </Typography>
          </Box>

          {userProgress && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Progress: {userProgress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={userProgress}
                color={getProgressColor(userProgress)}
                sx={{ height: 6, borderRadius: 1 }}
              />
            </Box>
          )}
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => navigate(`/quizzes/${id}`)}
          >
            {userProgress ? 'Continue Quiz' : 'Start Quiz'}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default QuizCard;
