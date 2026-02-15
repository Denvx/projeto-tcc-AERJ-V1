<template>
  <div class="min-h-screen w-full font-sans antialiased text-slate-900">
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
    name: 'DefaultView'
}
</script>
<style scoped>
</style>