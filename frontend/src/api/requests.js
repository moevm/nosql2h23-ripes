import http from './httpAxios'

export default class ExperimentsAPI {
  static async getExperiments(filter) {
    console.log(filter)
    return http.get('/experiments')
  }
  static async getExperiment(id) {
    return http.get(`/experiments/${id}`)
  }
  static async getStatistic() {
    return http.get(`/experiment_stats`)
  }
}