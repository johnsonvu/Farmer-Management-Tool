<template>
    <section class="main-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Statistics</span>
                </div>

                <div>
                    View the
                    <!--<select name="Performance" v-on:change="updateCategories(this.options[this.selectedIndex].value)">-->
                    <select id="performanceOption" name="Performance" v-on:change="updateCategories()">
                        <option value="MAX">best</option>
                        <option value="MIN">lowest</option>
                    </select>
                    performing animal of each species:
                </div>
                <br />

                <table class="simple-table">
                    <thead>
                    <tr>
                        <th>Species</th>
                        <th>Highest Yield</th>
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
            </div>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        async asyncData () {
            let { data } = await axios.get('/api/stats/animal/performance/max')
            return { categories: data }
        },
        head () {
            return {
                title: 'Statistics',
                categories: []
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
