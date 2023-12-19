<template>
    <h1 class="header_text">Импорт/экспорт данных</h1>
    <div class="export_section">
      <h1 class="export_text">Экспорт</h1>
      <label class="label_1" for="file_name">Введите название файла:</label>
      <input class="file_name" type="text" @input="event=>downloadFileName=event.target.value" :value="downloadFileName">
      <h1 class="file_name_text">Формат файла: JSON</h1>
      <!-- <div class="range_slider">
        <p>Диапазон индексов записей</p>
        <input type="range" id="cowbell" name="cowbell" min="0" max="1000" value="500" step="100" />
      </div> -->
      <button @click="handleExport" class="export_button">Экспорт</button>
    </div>
    <div class="import_section">
      <h1 class="import_text">Импорт</h1>
      <p class="chosen_file_text">Выбранный файл: {{ chosenFileName?.name }}</p>
      <br>
      <input class="chosen_file" type="file" @change="handleFileChange">
      <button @click="handleImport" class="import_button">Импорт</button>
    </div>
  </template>
  
  <script>
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import ExperimentsAPI from '@/api/requests'
  
  export default {
    name: 'ImportExportComponent',
    data(){
      return {
        chosenFileName: null,
        downloadFileName: "export.json",
      }
    },
    methods: {
      handleFileChange(event) {
      this.chosenFileName = event.target.files[0] || null;
      },
      async handleImport() {
        const formData = new FormData();
        formData.append('file', this.chosenFileName);
        await ExperimentsAPI.importFile(formData)
      },
      async handleExport() {
        const result = await ExperimentsAPI.exportFile()
        const data = JSON.stringify(result)
        const blob = new Blob([data], {type: 'application/json'});
        const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = this.downloadFileName;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      },
    }
  }
  </script>
   
  <style scoped>

   .header_text {
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 800;
        color: #013F4E;
        }
    .export_text {
      font-size: 30px;
      font-weight: 800;
      margin-top: 30px;
      margin-left: 777px;
        }
      /* .range_slider {
      font-size: 20px;
      font-weight: 400;
      margin-left: 777px;
        } */
      .file_name {
        width: 300px;
        height: 30px;
        background-color: rgb(216, 206, 206);
        }
      .label_1 {
        margin-left: 777px;
        font-size: 20px;
        font-weight: 400;
      }
      .file_name_text{
        margin-left: 777px;
        font-size: 20px;
        font-weight: 400;
      }
      .export_button {
        margin-left: 777px;
        width: 150px;
        height: 30px;
        background-color: #06471f;
        color: white;
        border-radius: 15px;
        font-size: 20px;
        font-weight: 800;
        cursor: pointer;
      }
    .import_text {
      font-size: 30px;
      font-weight: 800;
      margin-top: 30px;
      margin-left: 777px;
        }
      .chosen_file_text{
        margin-left: 777px;
        font-size: 20px;
        font-weight: 400;
      }
      .chosen_file {
        margin-left: 777px;
        width: 300px;
        height: 30px;
        }
      .import_button{
        margin-left: 777px;
        margin-top: 15px;
        width: 150px;
        height: 30px;
        background-color: #013F4E;
        color: white;
        border-radius: 15px;
        font-size: 20px;
        font-weight: 800;
        cursor: pointer;
      }
  </style>
  <!-- Add "scoped" attribute to limit CSS to this component only -->

  
  