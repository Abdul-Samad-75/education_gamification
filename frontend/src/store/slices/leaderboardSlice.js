import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaderboardService from '../../services/leaderboardService';

const initialState = {
  globalLeaderboard: [],
  subjectLeaderboard: [],
  userRank: null,
  isLoading: false,
  error: null,
};

export const fetchGlobalLeaderboard = createAsyncThunk(
  'leaderboard/fetchGlobal',
  async (_, { rejectWithValue }) => {
    try {
      return await leaderboardService.getGlobalLeaderboard();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch global leaderboard');
    }
  }
);

export const fetchSubjectLeaderboard = createAsyncThunk(
  'leaderboard/fetchSubject',
  async (subject, { rejectWithValue }) => {
    try {
      return await leaderboardService.getSubjectLeaderboard(subject);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subject leaderboard');
    }
  }
);

export const fetchUserRank = createAsyncThunk(
  'leaderboard/fetchUserRank',
  async (_, { rejectWithValue }) => {
    try {
      return await leaderboardService.getUserRank();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user rank');
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearLeaderboardState: (state) => {
      state.subjectLeaderboard = [];
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
