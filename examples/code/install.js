export default {
  installViaCDN: {
    lang: 'html',
    code: `
    <script src="//vuejs.org/js/vue.min.js"></script>
    <script src="//unpkg.com/vue-datable/dist/index.min.js"></script>`
  },
  installViaYarn: {
    lang: 'bash',
    code: `
    yarn add vue-datable`
  },
  usage: {
    lang: 'javascript',
    code: `
    import Vue from 'vue'
    import DataTable from 'vue-datable'
     
    Vue.use(DataTable)
     
    new Vue({
      el: '#app',
      data() {
        return {
          columns: [
            {
              key: 'id',
              title: 'ID',
              width: 100,
            }, {
              key: 'content',
              title: '内容'
            }
          ],
          rows: [
            {
              id: 1,
              content: '我是1号内容'
            }
          ]
        }
      }
    })`
  },
  usageVue: {
    lang: 'html',
    code: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>DataTable</title>
    </head>
    <body>
      <div id="app">
        <DataTable :columns="columns" :rows="rows"></DataTable>
      </div>
    </body>
    </html>`
  }
}
