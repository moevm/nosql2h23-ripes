<template>
    <h1 class="header_text">Импорт/экспорт данных</h1>
    <div class="export_section">
      <h1 class="export_text">Экспорт</h1>
      <label class="label_1" for="file_name">Введите название файла:</label>
      <input class="file_name" type="text">
      <h1 class="file_name_text">Формат файла: JSON</h1>
      <div class="range_slider">
        <p>Диапазон индексов записей</p>
        <input type="range" id="cowbell" name="cowbell" min="0" max="1000" value="500" step="100" />
      </div>
      <button class="export_button">Экспорт</button>
    </div>
    <div class="import_section">
      <h1 class="import_text">Импорт</h1>
      <p class="chosen_file_text">Выбранный файл:</p>
      <br>
      <input class="chosen_file" type="file">
      <button class="import_button">Импорт</button>
    </div>
  </template>
  
  <script>
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
//   import ExperimentsAPI from '@/api/requests'
  
  export default {
    name: 'ImportExportComponent',
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
      .range_slider {
      font-size: 20px;
      font-weight: 400;
      margin-left: 777px;
        }
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

  
  