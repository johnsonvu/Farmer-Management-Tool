<template>
  <section class="animals-view">
    <div class="content">
      <div class="subsection">
        <div style="margin: 25px 10px;">
          <span class="subsection-title" style="vertical-align: middle;">Product</span>
        </div>

        <input v-model="fromDate" placeholder="fromDate (yyyy-mm-dd)">
        <input v-model="toDate" placeholder="toDate (yyyy-mm-dd)">
        <input type="button" v-on:click="update(fromDate, toDate)" value="Submit" />

        <table class="simple-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Time</th>
              <th>Animal Id</th>
              <th>Farmer SIN</th>
          </tr>
          </thead>
          <tbody>
            <template v-for="product in products">
              <tr>
                <td>{{ product.productid}}</td>
                <td>{{ product.productiondate}}</td>
                <td>{{ product.animalid }}</td>
                <td>{{ product.sin }}</td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let { data } = await axios.get('/api/products/list')
    return { products: data }
  },

  head () {
    return {
      title: 'Products'
    }
  },

  data () {
    return {
      fromDate: '',
      toDate: '',
      message: '',
      products: []
    }
  },

  methods: {
    async update (fromDate, toDate) {
      let { data } = await axios.get('/api/products/list/range' + '?fromDate=' + fromDate + '&toDate=' + toDate)
      this.products = data
    }
  }
}
</script>

<style lang="stylus" scoped>
.animals-view
  padding-top 0

.content
  position absolute
  width 100%

.subsection
  background-color #fff
  border-radius 2px
  margin 25px 0
  transition all .5s cubic-bezier(.55,0,.1,1)
  padding 10px 30px 10px 30px
  position relative
  line-height 20px
  .subsection-title
    font-size 26px
    font-weight 500
  .title
    font-size 18px
    font-weight 500
  a
    text-decoration underline
    &:hover
      color #515ec4

.simple-table
  border-collapse: collapse
  width: 100%
  td, th
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
</style>
