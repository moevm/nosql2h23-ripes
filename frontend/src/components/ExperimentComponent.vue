<template>
    <div class="experiments_list"></div>
    <button class="back_button" v-on:click="this.$router.push('/experiments')">К списку экспериментов</button>
    <input @input="event=>filter_min=event.target.value" type="range" min="0" :max="cycles_len" value="0">
    <br>
    <input @input="event=>filter_max=event.target.value" type="range" min="0" :max="cycles_len" :value="filter_max">
    <br>
    <button class="custom-btn btn-15" v-on:click="getCycles(filter_min,filter_max)">Фильтр</button>
    <div class="table">
      <ag-grid-vue style="overflow-x:hidden; width: 100%; height: 500px;" class="ag-theme-alpine" :columnDefs="columnDefs"
        :rowData="rowData" @grid-ready="onGridReady" :defaultColDef="defaultColDef" @onColumnResized="onTableResized" editable=true>
      </ag-grid-vue>
    </div>
  </template>

  <script>
  import { AgGridVue } from 'ag-grid-vue3'
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import ExperimentsAPI from '@/api/requests'
  
  export default {
    name: 'ExperimentComponent',
    components: {
      AgGridVue
    },
    data() {
      return {
        filter_min: 0,
        filter_max: 0,
        cycles_len: 0,
        gridApi: null,
        defaultColDef: {
          resizable: true,
        },
        rowData: [{ title: 'dfdf' }, { title: 'dfdf' }],
        columnDefs: []
      }
    },
    methods: {
        onTableResized() {
        //this.gridApi.sizeColumnsToFit()
        },
        onGridReady(params) {
            this.gridApi = params.api
            //params.api.sizeColumnsToFit();
            //setInterval(() => params.api.sizeColumnsToFit(), 100)
        },
        async getCycles(min,max, init=false) {
          let arr = []
          let data = (await ExperimentsAPI.getExperiment(this.$route.params.id, min, max)).data
          if(init){
            this.cycles_len = data.cycles.length;
            this.filter_max = this.cycles_len;
          }
          for(let i = 0; i < data.instructions.length; i++){
            let j = {instructions: data.instructions[i]}
            for(let k = 0; k < data.cycles.length; k++){
              j['cycles'+(k+1)] = data.cycles[k][i] 
          }
            arr.push(j)
          }
          let header_array = [{
            headerName: 'Инструкции',
            field: 'instructions',
            colId: 'instructions',
            sizeColumnsToFit: true,
            filter: true,
            width: 200
          }]
          for(let i = 0; i < data.cycles.length; i++){
            header_array.push({
              headerName: (i+1+Number(this.filter_min)).toString(),
              field: 'cycles'+(i+1),
              colId: 'cycles'+(i+1),
              sizeColumnsToFit: false,
              filter: false,
              width: 50,
            })
          }
          this.columnDefs = header_array
          this.rowData = arr
        }
    },
    async created() {
      this.getCycles(undefined,undefined,true)
    }
  }
  </script>
   
  <style scoped>
  .table {
    width: 100%
  }
  .back_button {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #008CBA;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
    cursor: pointer;
    margin: 5px;
    font-family: 'Courier New', Courier, monospace;
  }

  .custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
.btn-15 {
  background: #b621fe;
  border: none;
  z-index: 1;
}
.btn-15:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background-color: #663dff;
  border-radius: 5px;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  transition: all 0.3s ease;
}
.btn-15:hover {
  color: #fff;
}
.btn-15:hover:after {
  left: 0;
  width: 100%;
}
.btn-15:active {
  top: 2px;
}
  </style>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  