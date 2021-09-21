<template>
    <div class="section columns vh-100 flex-center">
        <div class="column is-half">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-header-title">Reset Password</h2>
                </div>
                <div class="card-content">
                    <form>
                        <b-field label="Password">
                            <b-input type="password" v-model="password" password-reveal required/>
                        </b-field>
                        <b-field label="Repeat Password">
                            <b-input type="password" v-model="repeat_password" password-reveal required/>
                        </b-field>
                        <input class="button is-success m-auto submit-btn"  @click.prevent="resetPassword" type="submit" value="Submit">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "blank",

    data() {
        return {
            validtoken: true,
            password: null,
            repeat_password: null,
        }
    },

    created() {
        this.$axios.$post('/auth/verify-reset-token', {token: this.$route.query.token})
        .then(response => {
            if(response !== 'success'){
                this.setNotification({
                type: "is-danger",
                text: "Provided token is invalid or has expired."
            })
            this.validtoken = false
        }})
    },

    methods: {
        resetPassword() {
            if(this.password !== this.repeat_password){
                this.setNotification({
                    type: "is-danger",
                    text: "Passwords must match."
                })
            } else {
                this.$axios.$post('/auth/reset-password', {token: this.$route.query.token, password: this.password})
                .then(response => {
                if(response !== 'success'){
                    this.setNotification({
                        type: "is-danger",
                        text: "There was an error. Please contact support."
                    })
                }else{
                    this.setNotification({
                        type: "is-success",
                        text: "Success"
                    })
                    setTimeout(() => {
                        return this.$router.push("/")
                    }, 1000);
                }
            })
        }}
    }
}
</script>

<style scoped>
.submit-btn{
    width: 100%;
    margin-top: 10px;
}
</style>