import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import QuestionCard from '../components/quiz/QuestionCard';
import { submitQuiz } from '../store/slices/quizSlice';

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuiz, isLoading } = useSelector((state) => state.quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  // Initialize timer
  useEffect(() => {
    if (currentQuiz?.timeLimit) {
      setTimeLeft(currentQuiz.timeLimit * 60);
    }
  }, [currentQuiz]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 61 && !showTimeWarning) {
            setShowTimeWarning(true);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const result = await dispatch(submitQuiz({
      id,
      answers: Object.values(answers),
    })).unwrap();

    navigate(`/quizzes/${id}/results`, {
      state: { results: result },
    });
  };

  if (isLoading || !currentQuiz) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  const hasAnsweredCurrent = answers[currentQuestionIndex] !== undefined;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Timer */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h6"
          color={timeLeft <= 60 ? 'error' : 'primary'}
          sx={{ fontWeight: 'bold' }}
        >
          Time Left: {formatTime(timeLeft)}
        </Typography>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={currentQuiz.questions.length}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="contained"
            onClick={isLastQuestion ? () => setShowConfirmSubmit(true) : handleNext}
            disabled={!hasAnsweredCurrent}
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next'}
          </Button>
        </Box>
      </motion.div>

      {/* Confirm Submit Dialog */}
      <Dialog
        open={showConfirmSubmit}
        onClose={() => setShowConfirmSubmit(false)}
      >
        <DialogTitle>Submit Quiz?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmSubmit(false)}>Cancel</Button>
          <Button onClick={handleSubmitQuiz} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Time Warning Dialog */}
      <Dialog
        open={showTimeWarning}
        onClose={() => setShowTimeWarning(false)}
      >
        <DialogTitle>Time Running Out!</DialogTitle>
        <DialogContent>
          <Typography>
            You have less than 1 minute remaining. Your quiz will be automatically submitted when the time runs out.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTimeWarning(false)} variant="contained">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizAttempt;
