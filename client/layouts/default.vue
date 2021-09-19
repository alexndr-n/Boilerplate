<template>
  <div class="flex">
    <LayoutSidebar class="sidebar is-hidden-touch"/>
    <LayoutNotification class="toast" v-if="this.$store.state.notification.notification" :notification="this.$store.state.notification.notification" :key="this.$store.state.notification.id"/>
    <div class="main-content container">
      <LayoutNavigation/>
      <div>
        <Nuxt />
      </div>
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