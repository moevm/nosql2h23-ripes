<template>
    <div class="experiments_list">
        <h1>{{ statistics }}</h1>
    </div>
  </template>
  
<script>
  import ExperimentsAPI from '../api/requests'
  export default {
    name: 'StatisticsComponent',
    data() {
      return {
        statistics: null
      }
    },
    async created() {
      this.statistics = (await ExperimentsAPI.getStatistic()).data
      console.log(this.statistics)
    }
  }
</script>
  
<style>
.experiments_list {
  background-color: gray;
}


</style>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  
  