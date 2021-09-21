<template>
    <section class="flex-center vh-100">
        <AuthLogin class="column is-half"/>
    </section>
</template>

<script>
    export default {
        layout: 'blank',
        middleware: 'unauthenticated'
    }
</script>