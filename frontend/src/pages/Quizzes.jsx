import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import QuizCard from '../components/quiz/QuizCard';
import { fetchQuizzes } from '../store/slices/quizSlice';

const subjects = ['All', 'Mathematics', 'Science', 'History', 'Geography', 'Literature'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Quizzes = () => {
  const dispatch = useDispatch();
  const { quizzes, isLoading } = useSelector((state) => state.quiz);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const paginatedQuizzes = filteredQuizzes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Available Quizzes
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
            >
              {subjects.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              select
              fullWidth
              variant="outlined"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              label="Difficulty"
            >
              {difficulties.map((difficulty) => (
                <MenuItem key={difficulty} value={difficulty}>
                  {difficulty}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Quiz Cards */}
        <Grid container spacing={3}>
          {paginatedQuizzes.map((quiz, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={quiz.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <QuizCard quiz={quiz} userProgress={quiz.userProgress} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {filteredQuizzes.length > itemsPerPage && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(filteredQuizzes.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* Empty State */}
        {filteredQuizzes.length === 0 && !isLoading && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No quizzes found matching your criteria
            </Typography>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default Quizzes;
