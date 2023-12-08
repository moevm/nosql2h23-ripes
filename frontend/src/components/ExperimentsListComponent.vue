<template>
  <div class="experiments_list"></div>
  <h1>Список экспериментов</h1>
  <div class="table">
    <ag-grid-vue style="overflow-x:hidden; width: 100%; height: 500px;" class="ag-theme-alpine" :columnDefs="columnDefs"
      :rowData="rowData" @grid-ready="onGridReady" :defaultColDef="defaultColDef" @onColumnResized="onTableResized" editable=true @rowClicked="onRowClicked">
    </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ExperimentsAPI from '@/api/requests'

export default {
  name: 'ExperimentsListComponent',
  components: {
    AgGridVue
  },
  props: {
    params: Object
  },
  data() {
    return {
      gridApi: null,
      defaultColDef: {
        resizable: true,
      },
      rowData: [{ title: 'dfdf' }, { title: 'dfdf' }],
      columnDefs: [
        {
          headerName: 'Название',
          field: 'name',
          colId: 'name',
          sizeColumnsToFit: true,
          filter: true,
          onCellClicked: function(){
            console.log("Clicked");
          }
        },
        {
          headerName: 'Процессор',
          field: 'processor',
          colId: 'processor',
          filter: true,
        },
        {
          headerName: 'Исходный файл',
          field: 'source_file',
          colId: 'source_file',
          filter: true,
        },
        {
          headerName: 'Начало эксперимента',
          field: 'start_timestamp',
          colId: 'start_timestamp',
          filter: true,

        },
        {
          headerName: 'Конец эксперимента',
          field: 'end_timestamp',
          colId: 'end_timestamp',
          filter: true,
          
        },
        {
          headerName: 'Длительность',
          field: 'length',
          colId: 'length',
          filter: 'agNumberColumnFilter',
        },
      ]
    }
  },
  methods: {
    onRowClicked(params) {
      console.log(params)
      this.$router.push(`/experiments/${params.data.id}`)
    },
    onTableResized() {
      this.gridApi.sizeColumnsToFit()
    },
    onGridReady(params) {
      this.gridApi = params.api
      params.api.sizeColumnsToFit();
      //setInterval(() => params.api.sizeColumnsToFit(), 100)
    },
  },
  async created() {
    this.rowData = (await ExperimentsAPI.getExperiments()).data

    console.log((await ExperimentsAPI.getExperiments()).data)
  }
}
</script>
 
<style scoped>
.table {
  width: 100%;

}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

