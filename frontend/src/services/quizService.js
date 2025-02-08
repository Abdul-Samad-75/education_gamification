import api from './api';

const quizService = {
  async getAllQuizzes() {
    const response = await api.get('/quizzes');
    return response.data;
  },

  async getQuizById(id) {
    try {
      const response = await api.get(`/quizzes/${id}`);
      console.log('Quiz by ID response:', response.data); // Log the response to verify
      return response.data;
    } catch (error) {
      console.error("Error fetching quiz by ID:", error);
      throw error;  // Re-throwing the error to be handled in the thunk
    }
  },

  async submitQuiz(id, answers) {
    const response = await api.post(`/quizzes/${id}/submit`, { answers });
    return response.data;
  },

  async getQuizResults(id) {
    const response = await api.get(`/quizzes/${id}/results`);
    return response.data;
  },

  async createQuiz(quizData) {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },

  async updateQuiz(id, quizData) {
    const response = await api.put(`/quizzes/${id}`, quizData);
    return response.data;
  },

  async deleteQuiz(id) {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  }
};

export default quizService;
