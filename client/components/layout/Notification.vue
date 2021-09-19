<template>
        <b-notification
            :type="notification.type"
            aria-close-label="Close notification"
            role="alert">
            {{notification.text}}
        </b-notification>
</template>

<script>
    export default {
        props: ["notification"]
    }
</script>

<style scoped>
.notification{
    position: fixed;
    bottom: 70px;
    /* width: 60%; */
    right: 70px;
    z-index: 100 !important;
    padding: 0.5rem 2.5rem 0.5rem 1.5rem !important;
}
@media(max-width: 1000px){
 .notification{
    width: 90%;
    left: 5%;
    right: auto;
}   
}
</style>