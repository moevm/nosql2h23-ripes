<template>
  <NavbarComponent/>
  <router-view/>
</template>

<script>

import NavbarComponent from './components/NavbarComponent.vue'


export default {
  name: 'App',
  components: {
    NavbarComponent,
}
}
</script>
