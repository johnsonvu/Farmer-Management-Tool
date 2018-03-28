<template>
    <div class="mainDiv">
        <table cellspacing="0">
            <tr class="headerRow">
                <th>SIN</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Manager</th>
                <th>Edit</th>
            </tr>
            <tr v-for="(farmer, index) in farmers" :key="index">
                <td>
                    {{ farmer.sin }}
                </td>
                <td>
                    <span v-show="!farmer.editMode">{{ farmer.firstname }}</span>
                    <input v-show="farmer.editMode" type="text" v-model="farmer.firstname" />
                </td>
                <td>
                    <span v-show="!farmer.editMode">{{ farmer.lastname }}</span>
                    <input v-show="farmer.editMode" type="text" v-model="farmer.lastname" />
                </td>
                <td>
                    <span v-show="!farmer.editMode">{{ farmer.manager_firstname + " " + farmer.manager_lastname }}</span>
                    <input v-show="farmer.editMode" type="text" v-model="farmer.manager" />
                </td>
                <td>
                    <input v-show="!farmer.editMode" type="button" class="feedButton" v-on:click="farmer.editMode = true" value="EDIT" />
                    <input v-show="farmer.editMode" type="button" class="feedButton" v-on:click="trySaveFarmer(index)" value="SAVE" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        async asyncData () {
            let [workers, managers] = [await axios.get('/api/workers'), await axios.get('api/managers')]
            return { workers: workers, managers: managers }
        },

        head () {
            return {
                title: 'Users'
            }
        },

        data () {
            return {
                farmers: []
            }
        },

        methods: {
            trySaveFarmer (index) {
                if (this.farmers[index].food === '' || this.farmers[index].food === undefined) {
                    alert('Please enter food type before submitting')
                } else if (this.farmers[index].water === '' || this.farmers[index].water === undefined) {
                    alert('Please enter litres of water before submitting')
                } else {
                    this.feed(index)
                }
            },
            saveFarmer (index) {
                this.farmers[index].hasfed = true
                axios.post('/api/meal-feedings', {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            date: this.parseDate(new Date()),
                            food: this.farmers[index].food,
                            water: this.farmers[index].water,
                            farmerId: this.farmers[index].id,
                            sin: this.farmers[index].sin
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
    div.mainDiv {
        box-shadow: 2px 2px 10px #7f828b;
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
    }
    tr.headerRow th {
        padding-bottom: 1em;
    }
    .feedButton {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 0.5em 2em;
        text-align: center;
        font-size: 1.2em;
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