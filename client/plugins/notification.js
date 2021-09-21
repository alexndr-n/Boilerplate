import Vue from "vue"

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    methods: {
        setNotification(notification) {
          this.$store.dispatch('notification/setNotification', notification)
        },
      }
  })
}