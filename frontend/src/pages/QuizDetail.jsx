import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Timer as TimerIcon,
  QuestionAnswer as QuestionIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fetchQuizById } from '../store/slices/quizSlice';

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuiz, isLoading } = useSelector((state) => state.quiz);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch, id]);

  const handleStartQuiz = () => {
    navigate(`/quizzes/${id}/attempt`);
  };

  if (isLoading || !currentQuiz) {
    return null; // Add a loading spinner here
  }

  const rules = [
    'You cannot go back to previous questions once answered',
    'Each question has a time limit based on difficulty',
    'Points are awarded based on accuracy and time taken',
    'You need to complete all questions to receive a score',
    'Results will be shown immediately after completion',
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          {/* Quiz Header */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {currentQuiz.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Chip
              label={currentQuiz.category}
              color="primary"
              sx={{ mr: 1 }}
            />
            <Chip
              label={currentQuiz.difficulty}
              color={
                currentQuiz.difficulty === 'Beginner'
                  ? 'success'
                  : currentQuiz.difficulty === 'Intermediate'
                  ? 'warning'
                  : 'error'
              }
              sx={{ mr: 1 }}
            />
            <Chip
              icon={<TrophyIcon />}
              label={`${currentQuiz.points} Points`}
              color="secondary"
            />
          </Box>

          <Typography variant="body1" paragraph>
            {currentQuiz.description}
          </Typography>

          {/* Quiz Details */}
          <List sx={{ mb: 3 }}>
            <ListItem>
              <ListItemIcon>
                <TimerIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Time Limit"
                secondary={`${currentQuiz.timeLimit} minutes`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <QuestionIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Questions"
                secondary={`${currentQuiz.questionCount} questions`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TrophyIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Passing Score"
                secondary={`${currentQuiz.passingScore}%`}
              />
            </ListItem>
          </List>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartQuiz}
              sx={{ flex: 1 }}
            >
              Start Quiz
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<InfoIcon />}
              onClick={() => setShowRules(true)}
            >
              View Rules
            </Button>
          </Box>
        </Paper>
      </motion.div>

      {/* Rules Dialog */}
      <Dialog
        open={showRules}
        onClose={() => setShowRules(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Quiz Rules</DialogTitle>
        <DialogContent>
          <List>
            {rules.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={rule} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRules(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizDetail;
