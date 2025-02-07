import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import badgeService from '../../services/badgeService';

const initialState = {
  badges: [],
  userBadges: [],
  currentBadge: null,
  isLoading: false,
  error: null,
};

export const fetchBadges = createAsyncThunk(
  'badge/fetchBadges',
  async (_, { rejectWithValue }) => {
    try {
      return await badgeService.getAllBadges();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch badges');
    }
  }
);

export const fetchUserBadges = createAsyncThunk(
  'badge/fetchUserBadges',
  async (_, { rejectWithValue }) => {
    try {
      return await badgeService.getUserBadges();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user badges');
    }
  }
);

export const fetchBadgeById = createAsyncThunk(
  'badge/fetchBadgeById',
  async (id, { rejectWithValue }) => {
    try {
      return await badgeService.getBadgeById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch badge');
    }
  }
);

const badgeSlice = createSlice({
  name: 'badge',
  initialState,
  reducers: {
    clearBadgeState: (state) => {
      state.currentBadge = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Badges
      .addCase(fetchBadges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.badges = action.payload;
      })
      .addCase(fetchBadges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch User Badges
      .addCase(fetchUserBadges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserBadges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBadges = action.payload;
      })
      .addCase(fetchUserBadges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Badge by ID
      .addCase(fetchBadgeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBadgeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBadge = action.payload;
      })
      .addCase(fetchBadgeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBadgeState } = badgeSlice.actions;
export default badgeSlice.reducer;
