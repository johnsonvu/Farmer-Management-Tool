<template>
  <div>
        <table class="simple-table">
          <thead>
            <tr>
              <!--<th>Id</th>-->
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
                <!--<td>{{ animal.id }}</td>-->
                <td>{{ animal.species }}</td>
                <td><input type="text" name="a_name" :value="animal.name" v-model="animal.name" size="10"><br></td>
                <td><input type="number" class="shortInput" :value="animal.age" v-model="animal.age" size="5"></td>
                <td><input type="number" class="shortInput" :value="animal.weight" v-model="animal.weight" size="5"></td>
                <td>
                <select v-model="animal.pennumber">
                  <option v-for="pen in pens" :value="pen.pennumber" key="pen.pennumber"  >{{pen.location}}</option>
                </select>
                </td>
                <td>
                <select v-model="animal.sin">
                    <option v-for="(farmer, farmerIndex) in farmers" :value="farmer.sin" key="farmer.sin" >{{farmer.firstname + ' ' + farmer.lastname}}</option>
                </select>
                </td>
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
        let [animals, pens, farmers] = await Promise.all([axios.get('/api/animals/pen-farmer-list'), axios.get('/api/pens'), axios.get('/api/farmers/all')])
        return {animals: animals.data, pens: pens.data, farmers: farmers.data}
    },

    head () {
        return {
        title: 'Animals'
        }
    },

    methods: {
        tryUpdate (index) {
          if (this.animals[index].name === '' || this.animals[index].name === undefined || this.animals[index].name === null) {
            alert('Please enter animal name before submitting')
          } else {
              let id = this.animals[index].id
              let data = {
                      id: this.animals[index].id,
                      age: this.animals[index].age,
                      weight: this.animals[index].weight,
                      name: this.animals[index].name,
                      sin: this.animals[index].sin,
                      pennumber: this.animals[index].pennumber}
              this.update(id, data)
          }
        },
        update (id, data) {
            console.log(data)
          axios.put(`/api/animals/update/${id}`, data)
        },
        tryDelete (index) {
          console.log('delete button pushed')
          let id = this.animals[index].id
          let name = this.animals[index].name
          this.delete(id, name)
        },
        delete (id, name) {
          if (confirm(`Are you sure you really want to delete ${name}?`)) {
            console.log(id)
            axios.delete(`/api/animals/delete/${id}`)
            .then((response) => {
              console.log('axios log: ', response)
              this.asynchData()
            })
            .catch(error => Promise.reject(error))
          }
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
.shortInput {
  width: 50px;
}
</style>
