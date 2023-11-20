<template>
    <div class="experiments_list">
        <h1>Статистика экспериментов</h1>
    </div>
  </template>
  
<script>
  import ExperimentsAPI from '../api/requests'
  export default {
    name: 'StatisticsComponent',
    props: {
    },
    async created() {
      console.log((await ExperimentsAPI.getExperiments()).data)
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  