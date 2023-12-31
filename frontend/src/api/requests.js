import http from './httpAxios'

export default class ExperimentsAPI {
  static async getExperiments(filter) {
    console.log(filter)
    return http.get('/experiments', {headers: {filters: JSON.stringify(filter)}})
  }
  static async getExperiment(id, min,max) {
    if(min !== undefined && max!== undefined) {
      return http.get(`/experiments/${id}`, {headers: {cycle_range: `{"begin":${min},"end":${max}}`}})
    }
    return http.get(`/experiments/${id}`)
  }
  static async getStatistic(filters) {
    for (const [key, value] of Object.entries(filters)) {
      if(value === null || value === '') {
        delete filters[key]
      }
    }
    return http.get(`/experiment_stats`, {headers: {filters: JSON.stringify(filters)}, validateStatus: false})
  }
  static async importFile(formData){
    try {
      await http.post('/import', formData);
      alert('Импорт выполнен успешно')
    } catch(error) {
      alert('Произошла ошибка при импорте')
    }
  
  }
  static async exportFile(){
    const respone = await http.get('/export');
    return respone;
  }
}
