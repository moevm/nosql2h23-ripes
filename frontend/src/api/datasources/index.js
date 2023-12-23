import ExperimentsAPI from '@/api/requests'

function filtersToServer(filters) {
  const keys = Object.keys(filters)
  const res = {}
  keys.forEach((key) => { 
    res[key] = filters[key].filter
  })
  return res
}

export class ExperimentsDataSource {
  async getRows(params) {
    //const limit = params.endRow - params.startRow
    //const offset = params.startRow

    console.log('TEEEEEEEEEEEEEEEEESS')
    console.log(params)
    const filter = params.filterModel
    console.log(filtersToServer(filter))
    const response = await ExperimentsAPI.getExperiments(filter)
    console.log(response)
    params.successCallback(response.data, 15)
  }
}
