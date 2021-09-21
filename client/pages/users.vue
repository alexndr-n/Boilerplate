<template>
  <section class="section">
    <div class="card main-card">
      <div class="card-content">
          <UsersTable />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>
