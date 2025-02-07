import api from './api';

const leaderboardService = {
  async getGlobalLeaderboard() {
    const response = await api.get('/leaderboard/global');
    return response.data;
  },

  async getSubjectLeaderboard(subject) {
    const response = await api.get(`/leaderboard/subject/${subject}`);
    return response.data;
  },

  async getUserRank() {
    const response = await api.get('/leaderboard/rank');
    return response.data;
  },
};

export default leaderboardService;
