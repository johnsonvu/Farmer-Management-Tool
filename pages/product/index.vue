<template>
  <section class="animals-view">
    <div class="content">
      <div class="subsection">
        <div style="margin: 25px 10px;">
          <span class="subsection-title" style="vertical-align: middle;">Product</span>
        </div>

        From Date:
        <input type="date" v-model="fromDate" >
        To Date:
        <input type="date" v-model="toDate" >
        <input type="button" v-on:click="update(fromDate, toDate)" value="Submit" />

        <div class="title">Eggs</div>
        <table class="simple-table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Animal Id</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Production Date</th>
              <th>Farmer SIN</th>
          </tr>
          </thead>
          <tbody>
            <template v-for="e in eggs">
              <tr>
                <td>{{ e.productid}}</td>
                <td>{{ e.animalid}}</td>
                <td>{{ e.quantity }}</td>
                <td>{{ e.size }}</td>
                <td>{{ e.productiondate }}</td>
                <td>{{ e.sin }}</td>
            </tr>
            </template>
          </tbody>
        </table>
        Average Quantity: {{ eggsavg[0].avg }}<br>
        Total # of Products: {{ eggscount[0].count }}
        <br><br>
        <div class="title">Milk</div>
        <table class="simple-table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Animal Id</th>
              <th>Volume</th>
              <th>Grade</th>
              <th>Production Date</th>
              <th>Farmer SIN</th>
          </tr>
          </thead>
          <tbody>
            <template v-for="m in milk">
              <tr>
                <td>{{ m.productid}}</td>
                <td>{{ m.animalid}}</td>
                <td>{{ m.volume }}</td>
                <td>{{ m.grade }}</td>
                <td>{{ m.productiondate }}</td>
                <td>{{ m.sin }}</td>
            </tr>
            </template>
          </tbody>
        </table>
        Average Volume: {{ milkavg[0].avg }}<br>
        Total # of Products: {{ milkcount[0].count }}
        <br><br>
        <div class="title">Eggs</div>
        <table class="simple-table">
          <thead>
            <tr>
              <th>Product Id</th>
              <th>Animal Id</th>
              <th>Weight</th>
              <th>Grade</th>
              <th>Production Date</th>
              <th>Farmer SIN</th>
          </tr>
          </thead>
          <tbody>
            <template v-for="w in wool">
              <tr>
                <td>{{ w.productid}}</td>
                <td>{{ w.animalid}}</td>
                <td>{{ w.weight }}</td>
                <td>{{ w.grade }}</td>
                <td>{{ w.productiondate }}</td>
                <td>{{ w.sin }}</td>
            </tr>
            </template>
          </tbody>
        </table>
        Average Weight: {{ woolavg[0].avg }}<br>
        Total # of Products: {{ woolcount[0].count }}
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData () {
    let [eggs, milk, wool] = await Promise.all([axios.get('/api/products/eggs'),
                                                axios.get('/api/products/milk'),
                                                axios.get('/api/products/wool')])
   let [eggsavg, milkavg, woolavg] = await Promise.all([axios.get('/api/products/eggs/average'),
                                                        axios.get('/api/products/milk/average'),
                                                        axios.get('/api/products/wool/average')])
   let [eggscount, milkcount, woolcount] = await Promise.all([axios.get('/api/products/eggs/count'),
                                                              axios.get('/api/products/milk/count'),
                                                              axios.get('/api/products/wool/count')])
    return { eggs: eggs.data,
             milk: milk.data,
             wool: wool.data,
             eggsavg: eggsavg.data,
             milkavg: milkavg.data,
             woolavg: woolavg.data,
             eggscount: eggscount.data,
             milkcount: milkcount.data,
             woolcount: woolcount.data
           }
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
      eggs: [],
      milk: [],
      wool: [],
      eggsavg: '',
      milkavg: '',
      woolavg: '',
      eggscount: '',
      milkcount: '',
      woolcount: ''
    }
  },

  methods: {
    async update (fromDate, toDate) {
      let [eggs, milk, wool] = await Promise.all([axios.get('/api/products/eggs/range' + '?fromDate=' + fromDate + '&toDate=' + toDate),
                                                  axios.get('/api/products/milk/range' + '?fromDate=' + fromDate + '&toDate=' + toDate),
                                                  axios.get('/api/products/wool/range' + '?fromDate=' + fromDate + '&toDate=' + toDate)])
      // let { data } = await axios.get('/api/products/eggs/range' + '?fromDate=' + fromDate + '&toDate=' + toDate)
      // let { data2 } = await axios.get('/api/products/milk/range' + '?fromDate=' + fromDate + '&toDate=' + toDate)
      // let { data3 } = await axios.get('/api/products/wool/range' + '?fromDate=' + fromDate + '&toDate=' + toDate)
      this.eggs = eggs.data
      this.milk = milk.data
      this.wool = wool.data
      let [eggsavg, milkavg, woolavg] = await Promise.all([axios.get('/api/products/eggs/range/average' + '?fromDate=' + fromDate + '&toDate=' + toDate),
                                                           axios.get('/api/products/milk/range/average' + '?fromDate=' + fromDate + '&toDate=' + toDate),
                                                           axios.get('/api/products/wool/range/average' + '?fromDate=' + fromDate + '&toDate=' + toDate)])
      this.eggsavg = eggsavg.data
      this.milkavg = milkavg.data
      this.woolavg = woolavg.data
      let [eggscount, milkcount, woolcount] = await Promise.all([axios.get('/api/products/eggs/range/count' + '?fromDate=' + fromDate + '&toDate=' + toDate),
                                                                axios.get('/api/products/milk/range/count' + '?fromDate=' + fromDate + '&toDate=' + toDate),
                                                                axios.get('/api/products/wool/range/count' + '?fromDate=' + fromDate + '&toDate=' + toDate)])
      this.eggscount = eggscount.data
      this.milkcount = milkcount.data
      this.woolcount = woolcount.data
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
