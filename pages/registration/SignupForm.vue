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
                <select v-model="sin" style="width: 100%">
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
                <td colspan="2" style="text-align: center"><input type="button" class="button--grey" style="margin-top:1em" v-on:click="trySignup()" :value="signupText" /></td>
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
                sin: '',
                username: '',
                password: '',
                farmers: [],
                signupText: 'Create Account'
            }
        },
        methods: {
            trySignup () {
                this.signupText = 'Signing up...'
                console.log(this.username)
                console.log(this.password)
                console.log(this.sin)
                if (this.sin.length < 9) {
                    this.addFarmer()
                } else {
                    this.addStockholder()
                }
            },
            addFarmer () {
                axios.post('/api/users/addfarmer', {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            'username': this.username,
                            'password': this.password,
                            'sin': this.sin
                        }})
                    .then(response => {
                        console.log('Response is: ')
                        console.log(response)
                        if (response.data.length > 0) {
                            // success sign up
                            this.signupText = 'Signed Up!'
                            this.$nuxt.$router.replace({ path: '/' })
                        } else {
                            this.signupText = 'Failed!'
                            setTimeout(() => { this.signupText = 'Sign Up' }, 3000)
                        }
                    })
            },
            addStockholder () {
                axios.post('/api/users/add', {
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
                            // success sign up
                            this.signupText = 'Signed Up!'
                            this.$nuxt.$router.replace({ path: '/' })
                        } else {
                            this.signupText = 'Failed!'
                            setTimeout(() => { this.signupText = 'Sign Up' }, 3000)
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