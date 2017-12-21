<template>
  <div class="example">
    <h1>DataTable</h1>
    <p class="sub-title">DataTable is used to display a mass of structured data.</p>
    
    <div class="split-line"></div>
    <h1>Demo</h1>
    <DataTable :columns="columns" :rows="rows" :height="350" />

    <div class="split-line"></div>

    <h1>Installation</h1>

    <p>Via NPM:</p>
    <a href="">
      <img src="https://nodei.co/npm/vue-datable.png?downloads=true&downloadRank=true&stars=true" alt="NPM">
    </a>

    <p>Via Yarn:</p>
    <iCode :lang="codes.installViaYarn.lang" bg>{{ codes.installViaYarn.code }}</iCode>

    <p>Via CDN:</p>
    <iCode :lang="codes.installViaCDN.lang" bg>{{ codes.installViaCDN.code }}</iCode>


    <div class="split-line"></div>


    <h1>Usage</h1>
    <iCode :lang="codes.usage.lang" bg>{{ codes.usage.code }}</iCode>
    <iCode :lang="codes.usageVue.lang" bg>{{ codes.usageVue.code }}</iCode>

    <div class="split-line"></div>

    <h1>API</h1>
    <h2>props</h2>
    <div class="responsive">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
            <th>Optional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>columns</td>
            <td>Column configuration. Details are mentioned below.</td>
            <td>Array</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>rows</td>
            <td>Structured data displayed</td>
            <td>String</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>height</td>
            <td>table body max height, overflow hidden</td>
            <td>Number</td>
            <td>300</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>columns</h2>
    <div class="responsive">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>Column title.</td>
            <td>String</td>
          </tr>
          <tr>
            <td>key</td>
            <td>Data key.</td>
            <td>String</td>
          </tr>
          <tr>
            <td>width</td>
            <td>Column width.</td>
            <td>Number</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="split-line"></div>

    <h1>License</h1>
    <p>MIT</p>

    <a href="https://github.com/eeve/vue-datable"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>
  </div>
</template>

<script>
  import iCode from './Code'
  import Codes from '../code/install'
  export default {
    components: {
      iCode
    },
    data () {
      return {
        codeLang: 'html',
        codes: Codes,
        columns: [
          {
            key: 'id',
            title: 'ID',
            width: 100,
          },{
            key: 'content',
            title: '内容',
            // width: 299
          },{
            key: 'content2',
            title: '内容2',
            // width: 300
          },{
            key: 'content3',
            title: '内容3',
            // width: 350
          },{
            key: 'content4',
            title: '内容4',
            // width: 350
          }
        ],
        rows: (function() {
          const arr = []
          for(let i = 0; i < 200; i++) {
            arr.push({
              id: i + 1,
              content: `我是${i+1}号内容`,
              content2: `我是${i+1}号内容2`,
              content3: `我是${i+1}号内容3`,
              content4: `我是${i+1}号内容4`
            })
          }
          return arr
        })(),
      }
    },
    beforeMount() {
      setInterval(() => {
        this.rows.push({
          id: this.rows.length,
          content: Math.random() + 'aasdsadasdasdasdasd', // `我是${i+1}号内容`,
          content2: Math.random() + 'aasdsadasdasdasdasd', // `我是${i+1}号内容2`,
          content3: Math.random() + 'aasdsadasdasdasdasd', // `我是${i+1}号内容3`,
          content4: Math.random() + 'aasdsadasdasdasdasd',
        })
      }, 3000)
    }
  }
</script>

<style>
  body {
    font: 14px/1.6 Source Sans Pro,Calibri,Candara,Arial,sans-serif;
  }
  .sub-title {
    font-size: 1.1rem;
  }
  .split-line {
    border-bottom: 1px solid #eee;
    margin: 3rem 0;
  }
  .responsive {
    width: 100%;
    overflow-x: auto;
  }
  .example .responsive table {
    border-collapse:collapse;
  }
  .example .responsive table tr th {
    background: #f5f5f5;
  }
  .example .responsive table tr td, .example .responsive table tr th{
    border: 1px solid #eee;
    padding: 0.25rem 1rem;
  }
</style>
