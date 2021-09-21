<template>
  <section class="section">
    <div class="card main-card">
      <div class="card-content tile is-child is-ancestor">
        <div class="tile is-primary">asd</div>
        <div class="tile is-primary"></div>
        <div class="tile is-primary"></div>
        <div class="tile is-primary"></div>
        <div class="tile is-primary"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>

<style scoped>
.main-card{
  height: 100%;
  width: 100%;
}
</style>
