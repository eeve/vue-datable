import './app.css'
import Vue from 'vue'
import DataTable from 'datatable'
import App from './components/App.vue'
Vue.use(DataTable)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})
