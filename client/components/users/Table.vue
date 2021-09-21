<template>
    <section>
        <UsersModal v-if="this.selected" @delete="Delete()" :key="selected" :selected="selected"  @submitData="submit($event)" @close="selected = null"/>
        <div class="level">
            <div class="level-left">
            </div>
            <div class="level-right">
                <button class="button is-success" @click="selected = {}; action = 'add'">Create New</button>
            </div>
        </div>
        <b-table class="dark-1"
            :data="users"
            :columns="columns"
            :sort-icon="'arrow-up'"
            :sort-icon-size="'is-small'"
            :selected.sync="selected"
            :visible="columns.visible"
            :mobile-cards="true"
            :paginated="true"
            :per-page="25"
            :loading="$fetchState.pending"
            default-sort="full_name"
            focusable>

            <template #empty>
                <div class="has-text-centered">No records</div>
            </template>
            
        </b-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            selected: null,
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                    width: '40',
                    numeric: true,
                    sortable: true,
                },
                {
                    field: 'full_name',
                    label: 'Name',
                    sortable: true,
                },
                {
                    field: 'email',
                    label: 'Email',
                    sortable: true,
                    width: '100px',
                },
                {
                    field: 'role',
                    label: 'Role',
                    sortable: true,
                    centered: true,
                },
                {
                    field: 'dateCreated',
                    label: 'Date Created',
                    centered: true,
                    sortable: true,
                },
            ]
        }
    },
    async fetch(){
        await this.fetch()
    },
    methods: {
        async fetch(){
            try {
                const users = await this.$axios.get('/users')
                this.users = users.data
            } catch (error) {
                console.log(error)
                this.setNotification({
                    type: 'is-danger',
                    text: 'An error has ocurred.',
                })
            }
        },
        async submit(data){
            try {
                if(data.action === 'add'){
                    await this.$axios.$post("/users", data.user)
                    this.fetch()
                } else {
                    await this.$axios.$patch("/users", data.user)
                }
                this.selected = null
            } catch (error) {
                if(error.response.data.message === 'email already exists'){
                    this.setNotification({
                        type: 'is-danger',
                        text: 'Email already exists.',
                    })
                } else {
                    this.setNotification({
                        type: 'is-danger',
                        text: 'An error has ocurred.',
                    })
                }
            }
        },
        async Delete(){
            try {
                this.users.splice(this.users.indexOf(this.selected), 1)
                await this.$axios.$delete("/users/" + this.selected.id)
                this.selected = null
            } catch (error) {
                console.log(error)
                this.setNotification({
                    type: 'is-danger',
                    text: 'An error has ocurred.',
                })
            }
        }
    }
}
</script>