import DataTable from './DataTable'

const install = function (Vue, opts = {}) {
  Vue.component(DataTable.name, DataTable)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign({
  DataTable
}, { install })
