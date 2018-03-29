<template>
    <section class="main-view">
        <div class="content">
            <div class="subsection">
                <!--Chicken Harvesting-->
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Chicken Harvesting</span>
                </div>
                <table cellspacing="0">
                    <tr class="headerRow">
                        <th>Species</th>
                        <th>Name</th>
                        <th>Pen House</th>
                        <th>Egg Quantity</th>
                        <th>Egg Size</th>
                    </tr>
                    <tr v-for="(chicken, index) in chickens" :key="chicken.id">
                        <td>
                            {{ chicken.species }}
                        </td>
                        <td>
                            {{ chicken.name }}
                        </td>
                        <td>
                            {{ chicken.pennumber }}
                        </td>
                        <td>
                            <input v-show="!chicken.hasharvested" type="number" v-model="chicken.quantity" placeholder="Amount" />
                            <span v-show="chicken.hasharvested" style="color: forestgreen;">{{ chicken.quantity }}</span>
                        </td>
                        <td>
                            <select v-show="!chicken.hasharvested" v-model="chicken.size" name="size">
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                                <option value="X-Large">X-Large</option>
                            </select>
                            <span v-show="chicken.hasharvested" style="color: forestgreen;">{{ chicken.size }}</span>
                        </td>
                        <td>
                            <input v-show="!chicken.hasharvested" type="button" class="feedButton" v-on:click="tryHarvestAnimals(chickens, index, 'CHICKEN', 'quantity', 'size')" value="Submit" />
                            <span v-show="chicken.hasharvested" style="color: forestgreen;">Harvested</span>
                        </td>
                    </tr>
                </table>

                <!--Cow Harvesting-->
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Cow Harvesting</span>
                </div>
                <table cellspacing="0">
                    <tr class="headerRow">
                        <th>Species</th>
                        <th>Name</th>
                        <th>Pen House</th>
                        <th>Milk Volume (L)</th>
                        <th>Milk Grade</th>
                    </tr>
                    <tr v-for="(cow, index) in cows" :key="cow.id">
                        <td>
                            {{ cow.species }}
                        </td>
                        <td>
                            {{ cow.name }}
                        </td>
                        <td>
                            {{ cow.pennumber }}
                        </td>
                        <td>
                            <input v-show="!cow.hasharvested" type="number" v-model="cow.volume" placeholder="Volume" />
                            <span v-show="cow.hasharvested" style="color: forestgreen;">{{ cow.volume }}</span>
                        </td>
                        <td>
                            <select v-show="!cow.hasharvested" v-model="cow.grade" name="size">
                                <option value="B">B</option>
                                <option value="B+">B+</option>
                                <option value="A">A</option>
                                <option value="A+">A+</option>
                            </select>
                            <span v-show="cow.hasharvested" style="color: forestgreen;">{{ cow.grade }}</span>
                        </td>
                        <td>
                            <input v-show="!cow.hasharvested" type="button" class="feedButton" v-on:click="tryHarvestAnimals(cows, index, 'COW', 'volume', 'grade')" value="Submit" />
                            <span v-show="cow.hasharvested" style="color: forestgreen;">Harvested</span>
                        </td>
                    </tr>
                </table>

                <!--Sheep Harvesting-->
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Sheep Harvesting</span>
                </div>
                <table cellspacing="0">
                    <tr class="headerRow">
                        <th>Species</th>
                        <th>Name</th>
                        <th>Pen House</th>
                        <th>Wool Weight (lbs)</th>
                        <th>Wool Grade</th>
                    </tr>
                    <tr v-for="(sheep, index) in sheeps" :key="sheep.id">
                        <td>
                            {{ sheep.species }}
                        </td>
                        <td>
                            {{ sheep.name }}
                        </td>
                        <td>
                            {{ sheep.pennumber }}
                        </td>
                        <td>
                            <input v-show="!sheep.hasharvested" type="number" v-model="sheep.weight" placeholder="lbs" />
                            <span v-show="sheep.hasharvested" style="color: forestgreen;">{{ sheep.weight }}</span>
                        </td>
                        <td>
                            <select v-show="!sheep.hasharvested" v-model="sheep.grade" name="size">
                                <option value="B">B</option>
                                <option value="B+">B+</option>
                                <option value="A">A</option>
                                <option value="A+">A+</option>
                            </select>
                            <span v-show="sheep.hasharvested" style="color: forestgreen;">{{ sheep.grade }}</span>
                        </td>
                        <td>
                            <input v-show="!sheep.hasharvested" type="button" class="feedButton" v-on:click="tryHarvestAnimals(sheeps, index, 'SHEEP', 'weight', 'grade')" value="Submit" />
                            <span v-show="sheep.hasharvested" style="color: forestgreen;">Harvested</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        async asyncData () {
            let [chickens, cows, sheeps] = await Promise.all(
                [axios.get('/api/animals/harvest/chicken'),
                axios.get('/api/animals/harvest/cow'),
                axios.get('/api/animals/harvest/sheep')]
            )
            return { chickens: chickens.data, cows: cows.data, sheeps: sheeps.data }
        },

        head () {
            return {
                title: 'Users'
            }
        },

        data () {
            return {
                chickens: [],
                cows: [],
                sheeps: []
            }
        },

        methods: {
            tryHarvestAnimals (animals, index, species, param1, param2) {
                if (animals[index][param1] === '' || animals[index][param1] === undefined || animals[index][param1] === null) {
                    alert('Please enter ' + param1 + ' before submitting')
                } else if (animals[index][param2] === '' || animals[index][param2] === undefined || animals[index][param2] === null) {
                    alert('Please enter ' + param2 + ' before submitting')
                } else {
                    console.log(index)
                    this.harvest(animals, index, species, param1, param2)
                }
            },
            harvest (animals, index, species, param1, param2) {
                animals[index].hasharvested = true
                axios.post('/api/animals/harvest/' + species, {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            [param1]: animals[index][param1],
                            [param2]: animals[index][param2],
                            animalId: animals[index].id,
                            sin: animals[index].sin
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
    .main-view
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