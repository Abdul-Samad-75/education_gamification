import api from './api';

const quizService = {
  async getAllQuizzes() {
    const response = await api.get('/quizzes');
    return response.data;
  },

  async getQuizById(_id) {  // Use _id here
    const response = await api.get(`/quizzes/${_id}`);
    return response.data;
  },

  async submitQuiz(_id, answers) {  // Use _id here
    const response = await api.post(`/quizzes/${_id}/submit`, { answers });
    return response.data;
  },

  async getQuizResults(_id) {  // Use _id here
    const response = await api.get(`/quizzes/${_id}/results`);
    return response.data;
  },

  async createQuiz(quizData) {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },

  async updateQuiz(_id, quizData) {  // Use _id here
    const response = await api.put(`/quizzes/${_id}`, quizData);
    return response.data;
  },

  async deleteQuiz(_id) {  // Use _id here
    const response = await api.delete(`/quizzes/${_id}`);
    return response.data;
  }
};

export default quizService;
