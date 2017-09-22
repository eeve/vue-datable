<template>
  <div class="datatable-wrapper clearfix" ref="wrapper">
    <div class="table-head" :style="{ width: tableWidth + 'px' }">
      <table>
        <colgroup>
          <col v-for="(col, index) in columns" :style="getColWidthStyle(col, index)"/>
        </colgroup>
        <thead>
          <tr>
            <th v-for="(col, index) in columns" :style="getColWidthStyle(col, index)">{{ col.title }}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body" :style="{ width: tableWidth + 'px' }">
      <table>
        <colgroup>
          <col v-for="(col, index) in columns" :style="getColWidthStyle(col, index)"/>
        </colgroup>
        <tbody>
          <tr v-for="row in rows">
            <td v-for="(col, index) in columns" :style="getColWidthStyle(col, index)">{{ row[col.key] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="loading" v-if="loading">
      <Loading />
    </div>
  </div>
</template>

<script>
import Loading from './Loading'
export default {
  name: 'DataTable',
  components: {
    Loading
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      wrapperWidth: 0,
      widths: []
    }
  },
  computed: {
    tableWidth () {
      return this.widths.length > 0 ? this.widths.reduce((prev, curr) => prev + curr) : NaN
    },
    unsetWidthColumnIndies () {
      const arr = []
      this.columns.forEach((col, index) => {
        if (typeof col.width === 'undefined' || parseFloat(col.width) <= 0) {
          arr.push(index)
        }
      })
      return arr
    },
    unsetWidthColumns () {
      return this.columns.filter(col => typeof col.width === 'undefined' || parseFloat(col.width) <= 0)
    },
    settedWidthColumns () {
      return this.columns.filter(col => typeof col.width !== 'undefined' || parseFloat(col.width) > 0)
    }
  },
  beforeMount () {
    this.initWidth()
  },
  mounted () {
    this.wrapperWidth = this.$refs.wrapper.offsetWidth
  },
  watch: {
    columns () {
      this.initWidth()
    }
  },
  methods: {
    async initWidth () {
      // 如果所有的列都没有指定宽度的话，就不设置具体宽度
      if (this.unsetWidthColumns.length === this.columns.length) {
        // 啥也不做
      } else {
        let widths = []
        this.rows.forEach(row => {
          this.columns.forEach((col, index) => {
            const w = widths[index] || 0
            const val = row[col.key]
            const userWidth = col['width']
            if (typeof userWidth !== 'undefined' && parseFloat(userWidth) > 0) {
              widths[index] = userWidth
            } else if (typeof val !== 'undefined') {
              const realW = this.defaultWidth(val).width
              if (w < realW) {
                widths[index] = realW
              }
            }
          })
        })
        this.widths = widths

        // 等wrapperWidth计算出来了，就调整列宽
        let interval = setInterval(() => {
          if (this.wrapperWidth > 0) {
            if (this.tableWidth < this.wrapperWidth) {
              // 如果所有的列宽加起来还没有table-wrapper这么宽，则将多出来的宽平均分配到没有指定宽度的列上
              const avalibleW = (this.wrapperWidth - this.tableWidth)
              const unitW = avalibleW / this.unsetWidthColumnIndies.length
              // console.log(`多出${avalibleW},平均分配到${this.unsetWidthColumnIndies.length}列上，每列分配${unitW}`, this.unsetWidthColumnIndies, this.widths)
              this.unsetWidthColumnIndies.forEach(index => {
                this.widths[index] = this.widths[index] + unitW
              })
              this.widths = [...this.widths]
            }
            clearInterval(interval)
          }
        })
      }
    },
    defaultWidth (text) {
      return this.textSize('14px', text)
    },
    getColWidthStyle (col, index) {
      return { width: this.widths[index] + 'px' }
    },
    textSize (fontSize, text) {
      const span = document.createElement('span')
      const result = {
        width: span.offsetWidth,
        height: span.offsetWidth
      }
      span.style.visibility = 'hidden'
      span.style.padding = '0.1rem 0.5rem'
      document.body.appendChild(span)
      if (typeof span.textContent !== 'undefined') {
        span.textContent = text
      } else {
        span.innerText = text
      }
      result.width = span.offsetWidth - result.width
      result.height = span.offsetHeight - result.height
      span.parentNode.removeChild(span)
      return result
    }
  }
}
</script>

<style scoped>
  .clearfix {
    overflow: auto;
    _height: 1%;
  }
  .datatable-wrapper {
    width: 100%;
    border: 1px solid #eee;
    overflow-x: auto;
    position: relative;
  }
  .datatable-wrapper * {
    box-sizing: border-box;
  }
  .datatable-wrapper .loading {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: -2px;
    background: rgba(255, 255, 255, 0.8);
  }
  .datatable-wrapper .loading .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -11px;
    margin-left: -7px;
  }
  .datatable-wrapper .loading .loader rect {
    fill: #111;
  }

  .table-head > table,
  .table-body > table {
    width: 100%;
    border-collapse: collapse;
  }

  .table-head {
    color: #111;
  }

  .table-body {
    /* height: 300px; */
    overflow-y: auto;
    overflow-x: hidden;
  }

  table tbody {
    display: block;
    overflow-y: scroll;
  }

  table thead th {
    background: #888;
  }

  table thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tbody td, thead th {
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    text-align: left;

    white-space: nowrap;
    /* float: left; */
    padding: 0.1rem 0.5rem;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr td:last-child {
    border-right: none;
  }
</style>

