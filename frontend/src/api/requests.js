import http from './httpAxios'

export default class ExperimentsAPI {
  static async getExperiments(filter) {
    console.log(filter)
    return http.get('/experiments')
  }
  static async getExperiment(id, min,max) {
    if(min !== undefined && max!== undefined) {
      return http.get(`/experiments/${id}`, {headers: {cycle_range: `{"begin":${min},"end":${max}}`}})
    }
    return http.get(`/experiments/${id}`)
  }
  static async getStatistic(filters) {
    console.log(filters)
    return http.get(`/experiment_stats`, {headers: filters})
  }
}