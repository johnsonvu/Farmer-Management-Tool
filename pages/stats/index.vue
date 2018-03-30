<template>
    <section class="main-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Statistics</span>
                </div>

                <!--Farmer All Stars-->
                <br />
                <div>
                    Farmers that are responsible for all species:
                </div>
                <br />

                <table class="simple-table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="farmer in allstars">
                        <tr>
                            <td>{{farmer.firstname}}</td>
                            <td>{{farmer.lastname}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
                <br />

                <!--Category Performance-->
                <div>
                    View the
                    <select id="performanceOption" name="Performance" v-on:change="updateCategories()">
                        <option value="MAX">best</option>
                        <option value="MIN">lowest</option>
                    </select>
                    yield of the average/sum of an animal from each species:
                </div>
                <div>
                    View the
                    <select id="performanceOption2" v-model="option2" name="Performance2" v-on:change="updateCategories()">
                        <option value="AVG">average</option>
                        <option value="SUM">sum</option>
                    </select>
                    yield of an animal from each species:
                </div>
                <br />

                <table class="simple-table">
                    <thead>
                    <tr>
                        <th>Species</th>
                        <th>{{option2}} Yield</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="category in categories">
                        <tr>
                            <td>{{category.species}}</td>
                            <td>{{category.unit}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>

                <!--Animal Performance Stats-->
                <br />
                <div>
                    Animals' {{option2}} Yields:
                </div>
                <br />

                <table class="simple-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Species</th>
                        <th>Weight</th>
                        <th>{{option2}} Yield</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="animal in animals">
                        <tr>
                            <td>{{animal.name}}</td>
                            <td>{{animal.age}}</td>
                            <td>{{animal.species}}</td>
                            <td>{{animal.weight}}</td>
                            <td>{{animal.unit_avg}}</td>
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
            let [categoryPerformanceData, animalPerformanceData, allstars] = await Promise.all(
                [
                    axios.get('/api/stats/animal/performance/max/avg'),
                    axios.get('/api/stats/animal/performance'),
                    axios.get('/api/stats/farmer/allstars')
                ]
            )
            return {
                categories: categoryPerformanceData.data,
                animals: animalPerformanceData.data,
                allstars: allstars.data
            }
        },

        head () {
            return {
                title: 'Statistics'
            }
        },
        data () {
            return {
                categories: [],
                animals: [],
                allstars: [],
                option1: 'MAX',
                option2: 'AVG'
            }
        },
        methods: {
            async updateCategories () {
                var box = document.getElementById('performanceOption')
                var box2 = document.getElementById('performanceOption2')
                axios.get('/api/stats/animal/performance/' + box.options[box.selectedIndex].value +
                    '/' + box2.options[box2.selectedIndex].value).then((response) => {
                    this.categories = response.data
                })
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

    .simple-table
        border-collapse: collapse
        width: 100%
        td, th
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
</style>
