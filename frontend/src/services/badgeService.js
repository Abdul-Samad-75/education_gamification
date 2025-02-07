import api from './api';

const badgeService = {
  async getAllBadges() {
    const response = await api.get('/badges');
    return response.data;
  },

  async getBadgeById(id) {
    const response = await api.get(`/badges/${id}`);
    return response.data;
  },

  async getUserBadges() {
    const response = await api.get('/badges/user');
    return response.data;
  },

  async createBadge(badgeData) {
    const response = await api.post('/badges', badgeData);
    return response.data;
  },

  async updateBadge(id, badgeData) {
    const response = await api.put(`/badges/${id}`, badgeData);
    return response.data;
  },

  async deleteBadge(id) {
    const response = await api.delete(`/badges/${id}`);
    return response.data;
  },
};

export default badgeService;
