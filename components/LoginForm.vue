<template>
    <div class="loginBox">
        <img src="../static/logo.png" alt="logo">
        <h1 class="title">
            Farmer's Management Project
        </h1>
        <br />
        <table style="margin: auto">
            <tbody>
            <tr>
                <td style="text-align: right">Username: </td>
                <td><input v-model="username" type="text" /></td>
            </tr>
            <tr>
                <td style="text-align: right">Password: </td>
                <td><input v-model="password" type="password" /></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center"><input type="button" class="button--grey" style="margin-top:1em" v-on:click="login" :value="loginButtonText" /></td>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>
    import axios from '~/plugins/axios'

    export default {
        data () {
            return {
                username: '',
                password: '',
                loginButtonText: 'Login'
            }
        },
        methods: {
            login () {
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
                            this.$store.isLoggedIn = true
                            this.$store.isManager = response.data[0].ismanager
                            this.$store.isWorker = response.data[0].isworker
                            console.log(this.$store.isLoggedIn)
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
    .loginBox {
        min-width:  400px;
        min-height: 400px;
        background-color: white;
        border: solid black 1px;
        border-radius: 3px;
        align-content: center;
        padding: 1em;
    }
</style>