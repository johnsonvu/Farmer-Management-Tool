<template>
    <div>
        <table cellspacing="0">
            <tr class="headerRow">
                <th>Species</th>
                <th>Name</th>
                <!--<th>Age</th>-->
                <!--<th>Weight</th>-->
                <!--<th>Pen House</th>-->
                <th>Food</th>
                <th>Water (L)</th>
                <th>Feeding</th>
            </tr>
            <tr v-for="(animal, index) in animals" :key="animal.id">
                <td>
                    {{ animal.species }}
                </td>
                <td>
                    {{ animal.name }}
                </td>
                <!--<td>-->
                    <!--{{ animal.age }}-->
                <!--</td>-->
                <!--<td>-->
                    <!--{{ animal.weight }}-->
                <!--</td>-->
                <!--<td>-->
                    <!--{{ animal.pennumber }}-->
                <!--</td>-->
                <td>
                    <input v-show="!animal.hasfed" type="text" v-model="animal.food" placeholder="Food given" />
                    <span v-show="animal.hasfed" style="color: forestgreen;">{{ animal.food }}</span>
                </td>
                <td>
                    <input v-show="!animal.hasfed" type="number" min="0" max="100" v-model="animal.water" placeholder="Litres of water given" />
                    <span v-show="animal.hasfed" style="color: forestgreen;">{{ animal.water }}</span>
                </td>
                <td>
                    <input v-show="!animal.hasfed" type="button" class="feedButton" v-on:click="tryFeed(index)" value="Submit" />
                    <span v-show="animal.hasfed" style="color: forestgreen;">FED :)</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        async asyncData () {
            let { data } = await axios.get('/api/animals/feed')
            console.log(data)
            return { animals: data }
        },

        head () {
            return {
                title: 'Users'
            }
        },

        data () {
            return {
                someshit: 'helloworld',
                animals: []
            }
        },

        methods: {
            tryFeed (index) {
                if (this.animals[index].food === '' || this.animals[index].food === undefined || this.animals[index].food === null) {
                    alert('Please enter food type before submitting')
                } else if (this.animals[index].water === '' || this.animals[index].water === undefined || this.animals[index].water === null) {
                    alert('Please enter litres of water before submitting')
                } else {
                    console.log(index)
                    this.feed(index)
                }
            },
            feed (index) {
                this.animals[index].hasfed = true
                axios.post('/api/animals/feed', {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            date: this.parseDate(new Date()),
                            food: this.animals[index].food,
                            water: this.animals[index].water,
                            animalId: this.animals[index].id,
                            sin: this.animals[index].sin
                }})
            },
            parseDate (date) {
                var year = date.getFullYear()
                var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                var day = date.getDate()
                return year + '-' + month + '-' + day
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .users-view
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

        div.main-button {
            align-content center
            font-size: 3em;
            padding: 1em;
            border: solid black 2px;
            border-radius: 5px;
            margin: 1em;
        }
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
    tr:nth-child(even){background-color: #f2f2f2};

    .feedButton {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 0.5em 2em;
        text-align: center;
        font-size: 1em;
        display: inline-block;
        transition-duration: 0.4s;
        cursor: pointer;
        border-radius: 2px;
    }

    .feedButton {
        background-color: white;
        color: black;
        border: 2px solid #4CAF50;
    }

    .feedButton:hover {
        background-color: #4CAF50;
        color: white;
    }
</style>