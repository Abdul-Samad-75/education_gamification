import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizService from '../../services/quizService';

const initialState = {
  quizzes: [],
  currentQuiz: null,
  userAnswers: [],
  quizResults: null,
  isLoading: false,
  error: null,
};

export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      return await quizService.getAllQuizzes();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch quizzes');
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  'quiz/fetchQuizById',
  async (id, { rejectWithValue }) => {
    try {
      return await quizService.getQuizById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch quiz');
    }
  }
);

export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ id, answers }, { rejectWithValue }) => {
    try {
      return await quizService.submitQuiz(id, answers);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit quiz');
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUserAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswers[questionIndex] = answer;
    },
    clearQuizState: (state) => {
      state.currentQuiz = null;
      state.userAnswers = [];
      state.quizResults = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Quiz by ID
      .addCase(fetchQuizById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentQuiz = action.payload;
        state.userAnswers = new Array(action.payload.questions.length).fill(null);
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Submit Quiz
      .addCase(submitQuiz.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizResults = action.payload;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserAnswer, clearQuizState } = quizSlice.actions;
export default quizSlice.reducer;
