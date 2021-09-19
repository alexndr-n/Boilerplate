<template>
    <b-navbar class="navbar dark-1">
        <template #brand>
            <b-navbar-item  href="/" class="sidebar-logo is-hidden-desktop">
                <img src="~/assets/images/logo.png" width="200px"/>
            </b-navbar-item>
        </template>
        <template #start>
            <div class="flex-center">
                <b-input placeholder="Search" type="search" icon-right="magnify" class="search-box" custom-class="search" rounded></b-input>
            </div>
        </template>
        <template #end>
            <b-navbar-item class="is-inline-touch">
                <b-icon icon="bell" size="is-medium" custom-class="blue"></b-icon>
            </b-navbar-item>
            <b-navbar-item class="is-inline-touch">
                <b-icon icon="lifebuoy" size="is-medium" custom-class="blue"></b-icon>
            </b-navbar-item>
            <b-navbar-item href="/quotes" class="is-hidden-desktop">
                Overview
            </b-navbar-item>
            <b-navbar-item href="/users" class="is-hidden-desktop">
                Insurance &amp; Services
            </b-navbar-item>
            <b-navbar-dropdown :right="true" class=" is-hidden-desktop" label="Timesheets">
                <b-navbar-item href="/settings" class="dark">
                    Approvals
                </b-navbar-item>
                <b-navbar-item @click.prevent="logOut" class="dark">
                    Reports
                </b-navbar-item>
                <b-navbar-item href="/settings" class="dark">
                    Projects
                </b-navbar-item>
                <b-navbar-item @click.prevent="logOut" class="dark">
                    Computer Time
                </b-navbar-item>
                <b-navbar-item href="/settings" class="dark">
                    Invoices
                </b-navbar-item>
            </b-navbar-dropdown>
            <b-navbar-item href="/catalog" class="is-hidden-desktop">
                Customer Journey
            </b-navbar-item>
            <b-navbar-item href="/catalog" class="is-hidden-desktop">
                Data Playground
            </b-navbar-item>
            <b-navbar-item>
                <div class="separator-line is-hidden-touch"></div>
            </b-navbar-item>
            <b-navbar-dropdown :right="true" class="mr-2">
                <template v-slot:label>
                    <div class="columns user-label">
                        <img src="~/assets/images/placeholder-keanu.png" width="50px" height="50px" alt="user" class="is-hidden-touch">
                        <div>
                            <h2>Rolando Jarvis</h2>
                            <h3>Band: one island</h3>
                        </div>
                    </div>
                </template>
                <b-navbar-item href="/settings" class="dark">
                    Settings
                </b-navbar-item>
                <b-navbar-item @click.prevent="logOut" class="dark">
                    Logout
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>

<script>
    export default {
        methods: {
          logOut () {
            this.$store.dispatch('auth/reset').then(() => {
                this.$router.push('/')
            })
          },
        }
    }
</script>

<style lang="scss">
@import '~assets/css/variables';

.navbar{    
    .mdi-24px.mdi-set, .mdi-24px.mdi:before {
        font-size: 28px;
        color: $lighter_grey;
    }
    .separator-line{
        border-right: solid 1px;
        color: $lighter_grey;
        height: 60px;
    }
}
.user-label{
    img{
        object-fit: cover;
        height: 50px !important;
        border-radius: 50%;
    }
    h2{
        font-size: 1.15em;
        color: $twentyx_text;
    }
    h3{
        font-size: 0.95em;
        color: $lighter_grey;
    }
}
.blue{
    color: $twentyx_text;
    position: relative;
}
.search{
    height: 50px;
}

@media(min-width: 1023px){
    .navbar{
        padding: 3rem 1.5rem;
        padding-top: 20px;
    }
    .user-label{
        margin-right: 10px;

        img{
            margin-right: 25px;
        }
    }
}
</style>