<template>
    <div class="mainDiv">
        <table cellspacing="0">
            <tr>
                <td colspan="5" style="font-size: 2em">Workers</td>
            </tr>
            <tr class="headerRow">
                <th>SIN</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Manager</th>
                <th>Edit</th>
            </tr>
            <tr v-for="(farmer, index) in workers" :key="index">
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
                    <select v-show="farmer.editMode" v-model="farmer.manager_sin">
                        <option v-for="manager in managers" :value="manager.sin">{{ manager.firstname + " " + manager.lastname}}</option>
                    </select>
                </td>
                <td>
                    <input v-show="!farmer.editMode" type="button" class="feedButton" v-on:click="farmer.editMode = true" value="EDIT" />
                    <input v-show="farmer.editMode" type="button" class="feedButton" v-on:click="trySaveWorker(farmer)" value="SAVE" />
                </td>
            </tr>
            <tr>
                <td colspan="5" style="font-size: 2em">Managers</td>
            </tr>
            <tr class="headerRow">
                <th>SIN</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Manager</th>
                <th>Edit</th>
            </tr>
            <tr v-for="(farmer, index) in managers" :key="index">
                <td>{{ farmer.sin }}</td>
                <td>
                    <span v-show="!farmer.editMode">{{ farmer.firstname }}</span>
                    <input v-show="farmer.editMode" type="text" v-model="farmer.firstname" />
                </td>
                <td>
                    <span v-show="!farmer.editMode">{{ farmer.lastname }}</span>
                    <input v-show="farmer.editMode" type="text" v-model="farmer.lastname" />
                </td>
                <td></td>
                <td>
                    <input v-show="!farmer.editMode" type="button" class="feedButton" v-on:click="farmer.editMode = true" value="EDIT" />
                    <input v-show="farmer.editMode" type="button" class="feedButton" v-on:click="trySaveManager(farmer)" value="SAVE" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from '~/plugins/axios'

    export default {
        async asyncData () {
            let [workers, managers] = await Promise.all([axios.get('/api/farmers/workers'), axios.get('api/farmers/managers')])
            // console.log(workers.data.list)
            // let workers = await axios.get('/api/farmers/workers')
            // let managers = await axios.get('/api/farmers/managers')
            for (var worker of workers.data) {
                worker.editMode = false
            }
            for (var manager of managers.data) {
                manager.editMode = false
            }
            return { workers: workers.data, managers: managers.data }
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
            trySaveWorker (farmer) {
                if (farmer.firstname === '' || farmer.lastname === '' || farmer.manager_sin === '') {
                    alert(`Invalid data! Farmer ${farmer.firstname} ${farmer.lastname} could not be saved! Please ensure all fields are valid and try again.`)
                } else {
                    this.saveWorker(farmer)
                }
            },
            saveWorker (farmer) {
                axios.put('/api/farmers/workers', {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            'sin': farmer.sin,
                            'firstname': farmer.firstname,
                            'lastname': farmer.lastname,
                            'manager_sin': farmer.manager_sin
                        }})
                    .then(response => {
                        farmer.editMode = false
                    })
            },
            trySaveManager (farmer) {
                if (farmer.firstname === '' || farmer.lastname === '') {
                    alert(`Invalid data! Farmer ${farmer.firstname} ${farmer.lastname} could not be saved! Please ensure all fields are valid and try again.`)
                } else {
                    this.saveManager(farmer)
                }
            },
            saveManager (farmer) {
                axios.put('/api/farmers/managers', {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    data:
                        {
                            'sin': farmer.sin,
                            'firstname': farmer.firstname,
                            'lastname': farmer.lastname
                        }})
                    .then(response => {
                        farmer.editMode = false
                    })
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