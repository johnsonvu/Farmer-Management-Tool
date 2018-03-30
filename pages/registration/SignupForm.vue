<template>
    <div class="signupBox" style="text-align: center">
        <img src="../../static/logo.png" alt="logo">
        <h1 class="title">
            Sign up for an account
        </h1>
        <br />
        <table style="margin: auto">
            <tr>
                <td style="text-align: right">Farmer(opt): </td>
                <select v-model="f.sin" style="width: 100%">
                    <option v-for="(f, index) in farmers" :value="f.sin" key="f.sin" >{{f.firstname + ' ' + f.lastname}}</option>
                </select>
                </td>
            </tr>
            <tr>
                <td style="text-align: right">Username: </td>
                <td><input v-model="username" type="text" /></td>
            </tr>
            <tr>
                <td style="text-align: right">Password: </td>
                <td><input v-model="password" type="password" /></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center"><input type="button" class="button--grey" style="margin-top:1em" v-on:click="signup" :value="loginButtonText" /></td>
            </tr>
        </table>
    </div>
</template>
<script>
    import axios from '~/plugins/axios'

    export default {
        async asyncData () {
            console.log('HELLO')
            let { data } = await axios.get('/api/farmers/nouser')
            console.log(data)
            return { farmers: data }
        },
        head () {
            return {
            title: 'New User'
            }
        },
        data () {
            return {
                username: '',
                password: '',
                f: {},
                farmers: [],
                loginButtonText: 'Create Account'
            }
        },
        methods: {
            signup () {
                this.loginButtonText = 'Logging in...'
                axios.post('/api/login', {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            'username': this.username,
                            'password': this.password
                        }})
                    .then(response => {
                        console.log('Response is: ')
                        console.log(response)
                        if (response.data.length > 0) {
                            // logged in
                            this.loginButtonText = 'Logged in!'
                            this.$store.user_sin = response.data[0].sin
                            this.$store.loggedIn = true
                            this.$nuxt.$router.replace({ path: '/stakeholder' })
                        } else {
                            this.loginButtonText = 'Failed!'
                            setTimeout(() => { this.loginButtonText = 'Login' }, 3000)
                        }
                    })
            }
        }
    }
</script>

<style>
    .signupBox {
        min-width:  400px;
        min-height: 400px;
        background-color: white;
        border: solid black 1px;
        border-radius: 3px;
        align-content: center;
        padding: 1em;
    }
</style>