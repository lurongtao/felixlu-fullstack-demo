import Name from './components/Name'
import Vue from 'vue'
import Home from './components/Home.vue'
import './styles/app.scss'

Vue.config.productionTip = false

new Vue({
  el: '#root',
  components: {
    Home
  },
  template: '<Home />'
})
