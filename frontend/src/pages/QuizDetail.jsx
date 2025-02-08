import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Timer as TimerIcon,
  QuestionAnswer as QuestionIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { fetchQuizById } from "../store/slices/quizSlice";

const QuizDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentQuiz, isLoading, error } = useSelector((state) => state.quiz);
console.log(_id);

  useEffect(() => {
    dispatch(fetchQuizById(_id));
  }, [dispatch, _id]);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!currentQuiz) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6" color="textSecondary">
          No quiz found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {currentQuiz.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Chip label={currentQuiz.subject} color="primary" sx={{ mr: 1 }} />
            <Chip label={currentQuiz.difficulty} color="success" sx={{ mr: 1 }} />
            <Chip icon={<TrophyIcon />} label={`${currentQuiz.points} Points`} color="secondary" />
          </Box>

          <Typography variant="body1" paragraph>
            {currentQuiz.description}
          </Typography>

          <List sx={{ mb: 3 }}>
            <ListItem>
              <ListItemIcon>
                <TimerIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Time Limit" secondary={`${currentQuiz.timeLimit} minutes`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <QuestionIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Questions" secondary={`${currentQuiz.questions?.length} questions`} />
            </ListItem>
          </List>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/quizzes/${_id}/attempt`)}>
              Start Quiz
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default QuizDetail;
