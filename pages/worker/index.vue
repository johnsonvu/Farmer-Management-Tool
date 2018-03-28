<template>
  <section class="users-view">
    <div class="content">
      <div class="subsection">
        <div style="margin: 25px 10px;">
          <span class="subsection-title" style="vertical-align: middle;">Users in Database</span>
          <nuxt-link class="button--grey" style="padding: 5px 20px; text-decoration: none;" to="/users/add">Add User</nuxt-link>
        </div>
        <div class="main-button">
          <nuxt-link :to="{ path: '/worker/feed-animals' }">
            Log Feed Animals
          </nuxt-link>
        </div>
        <div class="main-button">
          <nuxt-link :to="{ path: '/users/harvest-animals' }">
            Log Harvest Animals
          </nuxt-link>
        </div>
        <div class="main-button">
          <nuxt-link :to="{ path: '/users/manage-animals' }">
            Manage Animals
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    async asyncData () {
      let { data } = await axios.get('/api/users')
      return { users: data }
    },

    head () {
      return {
        title: 'Users'
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
</style>