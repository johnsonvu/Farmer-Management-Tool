<template>
  <section class="animals-view">
    <div class="content">
      <div class="subsection">
        <div style="margin: 25px 10px;">
          <span class="subsection-title" style="vertical-align: middle;">Animals in Database</span>
        </div>

        <table class="simple-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Name</th>
              <th>Species</th>
              <th>Pen Location</th>
              <th>Farmer First Name</th>
              <th>Farmer Last Name</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="animal in animals">
              <tr>
                <td>{{animal.id}}</td>
                <td>{{animal.age}}</td>
                <td>{{ animal.weight }}</td>
                <td>{{ animal.name }}</td>
                <td>{{ animal.species }}</td>
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
    let { data } = await axios.get('/api/animals/pen-farmer-list')
    return { animals: data }
  },

  head () {
    return {
      title: 'Animals'
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
