import { createRouter, createWebHistory } from 'vue-router'
import ExperimentsListComponent from './components/ExperimentsListComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import StatisticsComponent from './components/StatisticsComponent.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/export_import',
            name: 'export_import',
            components: {
                default: ExperimentsListComponent,
                navbar: NavbarComponent
            }
        },
        {
            path: '/statistics',
            name:'statistics',
            components: {
                default: StatisticsComponent,
                navbar: NavbarComponent
            }
        }
    ]
})