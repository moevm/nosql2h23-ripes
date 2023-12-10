<template>
  <div class="experiments-container" v-if="statistics">
    <div class="filters-list-container">
      <div class="title">
          <strong>Фильтры</strong>
        </div>
      <div class="filters-list">
        

        <div class="form-group-input">
          <div class="input-title">
            Название процессора
          </div>
          <input class="stat-input" v-model="filters.processor" />
        </div>
        <div class="form-group-input">
          <div class="input-title">
            Название процессора
          </div>
          <input class="stat-input" v-model="filters.processor" />
        </div>
        <div class="form-group-input">
          <div class="input-title">
            Название процессора
          </div>
          <input class="stat-input" v-model="filters.processor" />
        </div>
        <div class="form-group-input">
          <div class="input-title">
            Название процессора
          </div>
          <input class="stat-input" v-model="filters.processor" />
        </div>
      </div>
      <div class="primary-button" style="margin-top: 1rem;">
        Применить
      </div>
    </div>
    <div class="experiments-list">
      <div class="form-group">
        <div class="title">
          Среднее время: {{ statistics.avg_time }}
        </div>
      </div>
      <div class="form-group">
        <div class="title">
          Минимальное время:
        </div>
      </div>
      <div class="form-group">
        <div class="title">
          Максимальное время:
        </div>
      </div>

      
    </div>

  </div>
</template>
  
<script>
import ExperimentsAPI from '../api/requests'
export default {
  name: 'StatisticsComponent',
  data() {
    return {
      statistics: null,
      filters: {
        processor: null,
        source_file: null
      }
    }
  },
  async created() {
    this.statistics = (await ExperimentsAPI.getStatistic()).data
    console.log(this.statistics)
  }
}
</script>
  
width: fit-content;
<style>
.primary-button {
  border-radius: 15px;
  background-color: #013F4E;
  color: white;
  padding: 0.2rem 1rem 0.2rem 1rem;
  width: fit-content;
  cursor: pointer;
}

.stat-input {
  border-radius: 15px;
}

.input-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.form-group-input {}

.form-group {
  display: flex;
  gap: 10px
}

.title {
  font-size: 1.5rem;
}

.experiments-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

.experiments-list {
  background-color: rgb(212, 212, 212);
  width: fit-content;
  padding: 2rem;
  border-radius: 15px;
}

.filters-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;  
}

.filters-list-container {
  background-color: rgb(212, 212, 212);
  width: fit-content;
  padding: 1.5rem 2rem 2rem 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
}
</style>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
