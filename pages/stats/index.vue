<template>
    <section class="main-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Statistics</span>
                </div>

                <!--Category Performance-->
                <div>
                    View the
                    <select id="performanceOption" name="Performance" v-on:change="updateCategories()">
                        <option value="MAX">best</option>
                        <option value="MIN">lowest</option>
                    </select>
                    yield average of an animal from each species:
                </div>
                <br />

                <table class="simple-table">
                    <thead>
                    <tr>
                        <th>Species</th>
                        <th>Average Yield</th>
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
                    Animals' Average Yields:
                </div>
                <br />

                <table class="simple-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Species</th>
                        <th>Weight</th>
                        <th>Average Yield</th>
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
            let [categoryPerformanceData, animalPerformanceData] = await Promise.all(
                [axios.get('/api/stats/animal/performance/max'), axios.get('/api/stats/animal/performance')]
            )
            return { categories: categoryPerformanceData.data, animals: animalPerformanceData.data }
        },

        head () {
            return {
                title: 'Statistics',
                categories: [],
                animals: []
            }
        },
        methods: {
            async updateCategories () {
                var box = document.getElementById('performanceOption')
                axios.get('/api/stats/animal/performance/' + box.options[box.selectedIndex].value).then((response) => {
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
