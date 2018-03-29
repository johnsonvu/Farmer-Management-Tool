<template>
  <div>
        <table class="simple-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Species</th>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Pen Location</th>
              <th>Assigned Farmer</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
              <tr v-for="(animal, index) in animals" :key="animal.id">
                <td>{{animal.id}}</td>
                <td>{{ animal.species }}</td>
                <td>{{ animal.name }}</td>
                <td>{{animal.age}}</td>
                <td>{{ animal.weight }}</td>
                <td>{{ animal.location }}</td>
                <td>{{ animal.firstname + ' ' + animal.lastname}}</td>
                <td>
                    <input v-show="true" type="button" class="actionButton updateButton" v-on:click="tryUpdate(index)" value="Update" />
                </td>
                <td>
                    <input v-show="true" type="button" class="actionButton deleteButton" v-on:click="tryDelete(index)" value="Delete" />
                </td>
              </tr>
            
          </tbody>
        </table>
      </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
    async asyncData () {
        let [animals, pens] = await Promise.all([axios.get('/api/animals/pen-farmer-list'), axios.get('/api/pens')])
        return {animals: animals.data, pens: pens.data}
    },

    head () {
        return {
        title: 'Animals'
        }
    },

    methods: {
        tryUpdate (index) {

        },
        update (index) {

        },
        tryDelete (index) {

        },
        delete (index) {

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

table {
        width: 100%;
        height: 100%
        border-style ridge
        padding: 2em;
        cell-padding: 1em;
        text-align left
        margin-top: 1em;
        margin-bottom: 1em;
        box-shadow: 2px 2px 10px #7f828b;
    }
tr.headerRow th {
    padding-bottom: 1em;
}

.actionButton {
        padding: 0.5em 1.5em;
        text-align: center;
        font-size: 1em;
        display: inline-block;
        transition-duration: 0.4s;
        cursor: pointer;
        border-radius: 2px;
    }

.updateButton {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}

.updateButton:hover {
    background-color: #4CAF50;
    color: white;
}
.deleteButton {
    background-color: white;
    color: black;
    border: 2px solid #D9534F;
}

.deleteButton:hover {
    background-color: #D9534F;
    color: white;
}
</style>
