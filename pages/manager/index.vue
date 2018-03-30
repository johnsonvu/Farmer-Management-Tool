<template>
    <section class="users-view">
        <div class="content">
            <div class="subsection">
                <div style="margin: 25px 10px;">
                    <span class="subsection-title" style="vertical-align: middle;">Select an action</span>
                </div>
                <div class="main-button">
                    <nuxt-link :to="{ path: '/manager/manage-farmers' }">
                        Manage Farmers
                    </nuxt-link>
                </div>
                <div class="main-button">
                    <nuxt-link :to="{ path: '/worker/manage-animals' }">
                        Manage Animals
                    </nuxt-link>
                </div>
                <div class="main-button">
                    <nuxt-link :to="{ path: '/stats' }">
                        View Statistics
                    </nuxt-link>
                </div>
                <div class="main-button">
                    <nuxt-link :to="{ path: '/product' }">
                        View Products
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {}
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
        font-size: 1.5em;
        text-align center;
        padding: 1em;
        border: solid black 2px;
        border-radius: 1px;
        margin: 1em;
        box-shadow: 2px 2px 10px #7f828b;
    }
</style>