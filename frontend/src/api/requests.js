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
    let userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    for (const [key, value] of Object.entries(filters)) {
      if(key === 'start_timestamp' || key === 'end_timestamp') {
        filters[key] = new Date(new Date(filters[key]).getTime() - userTimezoneOffset).toISOString()
      }
      if(value === null || value === '') {
        delete filters[key]
      }
    }
    return http.get(`/experiment_stats`, {headers: {filters: JSON.stringify(filters)}})
  }
}