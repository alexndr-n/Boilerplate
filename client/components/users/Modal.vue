<template>
    <div>
        <b-modal v-model="selected"  :active="false" :width="600" @close="$emit('close')">
            <div class="card" v-if="selected">
                <form class="card-content" @submit.prevent="$emit('submitData', {user, action})">
                    <h2 class="mb-2 is-size-4" v-if="action === 'add'">New User</h2>
                    <div class="flex" v-if="action === 'add'">
                        <b-field label="First Name" class="w-100">
                            <b-input v-model="user.first_name" required></b-input>
                        </b-field>
                        <b-field label="Last Name" class="w-100">
                            <b-input v-model="user.last_name" required></b-input>
                        </b-field>
                    </div>
                    <h2 class="mb-2 is-size-4" v-else>{{user.full_name}}</h2>
                    <b-field label="Email">
                        <b-input v-model="user.email" required></b-input>
                    </b-field>
                    <b-field label="Role" class="w-100" grouped>
                        <b-select v-model="user.role" :placeholder="user.role" required>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </b-select>
                    </b-field>
                    <div class="level">
                        <div class="level-left">
                        </div>
                        <div class="level-center">
                        </div>
                        <div class="level-right">
                            <b-field label="Date Created">
                                <b-input v-model="user.dateCreated" disabled></b-input>
                            </b-field>
                        </div>
                    </div>
                    <div class="level">
                        <div class="level-left">
                            <button class="button is-danger level-item" @click.prevent="Delete()" v-if="action !== 'add'">Delete</button>
                            <p v-if="action === 'delete'">Click Again To Confirm</p>
                        </div>
                        <div class="level-right">
                            <button class="button is-dark level-item" @click.prevent="$emit('close')">Cancel</button>
                            <input type="submit" class="button is-success level-item" value="Save">
                        </div>
                    </div>
                </form>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: ["selected"],
    async mounted(){
        try {
            this.action = this.selected && this.selected.full_name ? 'update' : 'add'
            if(this.action === 'update') this.user = this.selected
        } catch (error) {
            console.log(error)
        }
    },
    data(){
        return{
            action: null,
            user: {
                first_name: '',
                last_name: '',
                full_name: '',
                email: null,
                role: '',
            },
        }
    },
    methods: {
        Delete(){
            if(this.action === 'delete'){
                this.$emit('delete')
            }
            this.action = 'delete'
        }
    }
}
</script>