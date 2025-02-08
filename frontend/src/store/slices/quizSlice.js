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

// Utility function for safe error extraction
const extractErrorMessage = (error) => {
  return error?.response?.data?.message || 'Something went wrong';
};

// Fetch all quizzes
export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      return await quizService.getAllQuizzes();
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Fetch quiz by _id (Prevents unnecessary API calls)
export const fetchQuizById = createAsyncThunk(
  'quiz/fetchQuizById',
  async (_id, { getState, rejectWithValue }) => {
    const { quiz } = getState();
    if (quiz.currentQuiz?._id === _id) return quiz.currentQuiz; // Prevents redundant fetching

    try {
      const quiz = await quizService.getQuizById(_id);
      console.log('Fetched quiz:', quiz); // Debug log
      return quiz;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Submit quiz answers
export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async ({ _id, answers }, { rejectWithValue }) => {
    try {
      return await quizService.submitQuiz(_id, answers);
    } catch (error) {
      console.error('Quiz submission failed:', error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setUserAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswers = [...state.userAnswers]; // Ensures immutability
      state.userAnswers[questionIndex] = answer;
    },
    clearQuizState: (state) => {
      state.currentQuiz = null;
      state.userAnswers = [];
      state.quizResults = null;
      state.error = null; // Reset errors as well
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
      
      // Fetch Quiz by _id
      .addCase(fetchQuizById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        console.log('Quiz fetched successfully:', action.payload); // Debug log
        state.isLoading = false;
        state.currentQuiz = action.payload;

        // Ensure questions exist before setting userAnswers
        state.userAnswers = action.payload?.questions 
          ? new Array(action.payload.questions.length).fill(null) 
          : [];
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
