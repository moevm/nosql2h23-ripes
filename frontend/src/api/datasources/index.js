import ExperimentsAPI from '@/api/requests'

export class ExperimentsDataSource {
  async getRows(params) {
    const filter = params.filterModel
    
    const response = await ExperimentsAPI.getExperiments(filter)
    console.log(response)
    params.successCallback(response.data.rows, response.data.count)
  }
}
