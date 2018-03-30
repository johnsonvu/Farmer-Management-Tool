<template>
  <section class="animals-view">
    <div class="content">
      <div class="subsection">
        <div style="margin: 25px 10px;">
          <span class="subsection-title" style="vertical-align: middle;">Animals in Database</span>
        </div>
        <select v-model="selected">
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div id='example-3'>
          <input type="checkbox" id="Age" v-model="age">
          <label for="Age">Age</label>
          <input type="checkbox" id="Weight" v-model="weight">
          <label for="Weight">Weight</label>
          <input type="checkbox" id="Name" v-model="name">
          <label for="Name">Name</label>
          <br>
          </div>
        <input type="button" v-on:click="update(selected, age, weight, name)" value="Submit" />

        <table class="simple-table">
          <thead>
            <tr>
              <th>Id</th>
              <th v-if="age">Age</th>
              <th v-if="weight">Weight</th>
              <th v-if="name">Name</th>
              <th>Pen Location</th>
              <th>Farmer First Name</th>
              <th>Farmer Last Name</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="animal in animals">
              <tr>
                <td>{{ animal.id}}</td>
                <td v-if="age">{{ animal.age}}</td>
                <td v-if="weight">{{ animal.weight }}</td>
                <td v-if="name">{{ animal.name }}</td>
                <td>{{ animal.location }}</td>
                <td>{{ animal.firstname }}</td>
                <td>{{ animal.lastname }}</td>
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
    // let { data } = await axios.get('/api/animals/pen-farmer-list')
    // return { animals: data }
  },

  head () {
    return {
      title: 'Animals'
    }
  },
  data () {
    return {
      animals: [],
      selected: '',
      options: [
        { text: 'Chickens', value: 'CHICKEN' },
        { text: 'Cows', value: 'COW' },
        { text: 'Sheep', value: 'SHEEP' }
      ],
      age: '',
      weight: '',
      name: ''
    }
  },
  methods: {
    async update (selected, age, weight, name) {
      let { data } = await axios.get('/api/animals/pen-farmer-list/choose?animal=' + selected + '&age=' + age + '&weight=' + weight + '&name=' + name)
      this.animals = data
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
