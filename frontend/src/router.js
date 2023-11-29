import { createRouter, createWebHistory } from 'vue-router'
import ExperimentsListComponent from './components/ExperimentsListComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'
import StatisticsComponent from './components/StatisticsComponent.vue'
import ExperimentComponent from './components/ExperimentComponent.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/experiments',
            name: 'experiments',
            components: {
                default: ExperimentsListComponent,
                navbar: NavbarComponent
            }
        },
        {
            path: '/experiments/:id',
            name: 'experiment',
            components: {
                default: ExperimentComponent,
                navbar: NavbarComponent
            },
            props: true
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