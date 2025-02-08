import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaderboardService from '../../services/leaderboardService';

const initialState = {
  globalLeaderboard: [],
  subjectLeaderboard: [],
  userRank: null,
  isLoading: false,
  error: null,
};

// Fetch Global Leaderboard
export const fetchGlobalLeaderboard = createAsyncThunk(
  'leaderboard/fetchGlobal',
  async (_, { rejectWithValue }) => {
    try {
      const response = await leaderboardService.getGlobalLeaderboard();
      console.log('Global Leaderboard:', response); // Debugging
      return response;
    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
      return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch global leaderboard');
    }
  }
);

// Fetch Subject Leaderboard
export const fetchSubjectLeaderboard = createAsyncThunk(
  'leaderboard/fetchSubject',
  async (subject, { rejectWithValue }) => {
    try {
      const response = await leaderboardService.getSubjectLeaderboard(subject);
      console.log(`Subject Leaderboard (${subject}):`, response); // Debugging
      return response;
    } catch (error) {
      console.error(`Error fetching leaderboard for ${subject}:`, error);
      return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch subject leaderboard');
    }
  }
);

// Fetch User Rank
export const fetchUserRank = createAsyncThunk(
  'leaderboard/fetchUserRank',
  async (_, { rejectWithValue }) => {
    try {
      const response = await leaderboardService.getUserRank();
      console.log('User Rank:', response); // Debugging
      return response;
    } catch (error) {
      console.error('Error fetching user rank:', error);
      return rejectWithValue(error?.response?.data?.message || error?.message || 'Failed to fetch user rank');
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearLeaderboardState: (state) => {
      state.globalLeaderboard = [];
      state.subjectLeaderboard = [];
      state.userRank = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Global Leaderboard
      .addCase(fetchGlobalLeaderboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGlobalLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.globalLeaderboard = action.payload;
      })
      .addCase(fetchGlobalLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Subject Leaderboard
      .addCase(fetchSubjectLeaderboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubjectLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjectLeaderboard = action.payload;
      })
      .addCase(fetchSubjectLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // User Rank
      .addCase(fetchUserRank.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRank = action.payload;
      })
      .addCase(fetchUserRank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeaderboardState } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
