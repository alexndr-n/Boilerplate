<template>
  <div class="flex">
    <LayoutNotification class="toast" v-if="this.$store.state.notification.notification" :notification="this.$store.state.notification.notification" :key="this.$store.state.notification.id"/>
    <div class="main-content container">
        <Nuxt />
    </div>
  </div>
</template>

<style scoped>
.flex{
  display: flex;
}
.sidebar{
  width: 280px;
  /* position: fixed; */
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 40;
}
.main-content{
  min-height: 100vh;
}
.container{
  height: 100%;
}
</style>