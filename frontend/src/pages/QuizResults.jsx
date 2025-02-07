import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import QuestionCard from '../components/quiz/QuestionCard';

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  useEffect(() => {
    if (!results) {
      navigate('/quizzes');
    }
  }, [results, navigate]);

  if (!results) return null;

  const {
    score,
    totalQuestions,
    correctAnswers,
    timeSpent,
    earnedPoints,
    newBadges = [],
    questions,
    userAnswers,
  } = results;

  const percentage = (score / totalQuestions) * 100;
  const isPassed = percentage >= 70;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Results Summary */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            mb: 4,
            background: isPassed
              ? 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)'
              : 'linear-gradient(45deg, #f44336 30%, #ef5350 90%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            {isPassed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
          </Typography>

          <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={120}
              thickness={4}
              sx={{ color: 'rgba(255, 255, 255, 0.3)' }}
            />
            <CircularProgress
              variant="determinate"
              value={percentage}
              size={120}
              thickness={4}
              sx={{
                position: 'absolute',
                left: 0,
                color: 'white',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" component="div">
                {Math.round(percentage)}%
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>
            You scored {correctAnswers} out of {totalQuestions} questions
          </Typography>
        </Paper>

        {/* Statistics */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Quiz Statistics
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Time Spent"
                secondary={`${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`}
              />
              <TimelineIcon color="primary" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Points Earned"
                secondary={`${earnedPoints} points`}
              />
              <StarIcon color="primary" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="Accuracy"
                secondary={`${Math.round((correctAnswers / totalQuestions) * 100)}%`}
              />
              <TrophyIcon color="primary" />
            </ListItem>
          </List>
        </Paper>

        {/* New Badges */}
        {newBadges.length > 0 && (
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              New Badges Earned! 🏆
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {newBadges.map((badge) => (
                <Chip
                  key={badge.id}
                  label={badge.name}
                  color="secondary"
                  icon={<TrophyIcon />}
                />
              ))}
            </Box>
          </Paper>
        )}

        {/* Question Review */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Question Review
        </Typography>
        {questions.map((question, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <QuestionCard
              question={question}
              currentQuestion={index + 1}
              totalQuestions={totalQuestions}
              selectedAnswer={userAnswers[index]}
              showFeedback={true}
              onAnswerSelect={() => {}}
            />
          </Box>
        ))}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/quizzes')}
          >
            Try Another Quiz
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default QuizResults;
