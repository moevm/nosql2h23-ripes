<template>
  <NavbarComponent/>
  <ExperimentsListComponent></ExperimentsListComponent>
  <StatisticsComponent></StatisticsComponent>
</template>

<script>
import ExperimentsListComponent from './components/ExperimentsListComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue';
import StatisticsComponent from './components/StatisticsComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    ExperimentsListComponent,
    StatisticsComponent
}
}
</script>
