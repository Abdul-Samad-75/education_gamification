import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress,
} from "@mui/material";
import {
  Timer as TimerIcon,
  QuestionAnswer as QuestionIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuizCard = ({ quiz, userProgress }) => {
  const navigate = useNavigate();

  // Updated to match the API response
  const {
    _id,
    title,
    description,
    subject, // Replacing `category`
    difficulty,
    timeLimit,
    questions,
    points,
  } = quiz || {};

  const questionCount = questions?.length || 0; // Ensure question count is set

  console.log("Quiz ID:", _id);

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "success";
      case "intermediate":
        return "warning";
      case "advanced":
        return "error";
      default:
        return "primary";
    }
  };

  const handleStartQuiz = () => {
    if (!_id) {
      alert("Quiz ID is missing");
      return;
    }
    navigate(`/quizzes/${_id}`);
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            boxShadow: (theme) => theme.shadows[10],
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold" }}>
            {title || "Untitled Quizzes"}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Chip
              icon={<CategoryIcon />}
              label={subject || "No Subject"}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label={difficulty || "Unknown"}
              color={getDifficultyColor(difficulty)}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label={`${points || 0} Points`}
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
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description || "No description available."}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <TimerIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {timeLimit ? `${timeLimit} minutes` : "No time limit"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <QuestionIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {questionCount} questions
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button size="small" color="primary" variant="contained" fullWidth onClick={handleStartQuiz}>
            {userProgress ? "Continue Quiz" : "Start Quiz"}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default QuizCard;
