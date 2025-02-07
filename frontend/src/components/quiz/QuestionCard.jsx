import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  LinearProgress,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showFeedback = false,
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);

  const handleOptionSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onAnswerSelect(value);
  };

  const getOptionColor = (option) => {
    if (!showFeedback) return 'primary';
    if (option === question.correctAnswer) return 'success';
    if (option === selectedOption && option !== question.correctAnswer) return 'error';
    return 'primary';
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <Card sx={{ width: '100%', mb: 3 }}>
          <CardContent>
            {/* Progress Bar */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Question {currentQuestion} of {totalQuestions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((currentQuestion / totalQuestions) * 100)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(currentQuestion / totalQuestions) * 100}
                sx={{ height: 6, borderRadius: 1 }}
              />
            </Box>

            {/* Question Text */}
            <Typography variant="h6" component="div" sx={{ mb: 3 }}>
              {question.text}
            </Typography>

            {/* Options */}
            <RadioGroup
              value={selectedOption || ''}
              onChange={handleOptionSelect}
              sx={{ '& .MuiRadio-root': { py: 0.5 } }}
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FormControlLabel
                    value={option}
                    control={
                      <Radio
                        color={getOptionColor(option)}
                        disabled={showFeedback}
                      />
                    }
                    label={
                      <Typography
                        color={
                          showFeedback && option === question.correctAnswer
                            ? 'success.main'
                            : 'text.primary'
                        }
                      >
                        {option}
                      </Typography>
                    }
                    sx={{
                      width: '100%',
                      ml: 0,
                      p: 1.5,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  />
                </motion.div>
              ))}
            </RadioGroup>

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography
                    variant="body2"
                    color={selectedOption === question.correctAnswer ? 'success.main' : 'error.main'}
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {selectedOption === question.correctAnswer
                      ? 'Correct! 🎉'
                      : 'Incorrect'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {question.explanation}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionCard;
