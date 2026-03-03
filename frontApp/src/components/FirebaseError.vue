<template>
  <div class="error-container">
    <div class="error-card">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <div class="status-badge">
        <span class="dot"></span>
        Equipe AERJ trabalhando na solução
      </div>

      <h1>Serviço temporariamente indisponível</h1>
      <p>Nossa equipe de desenvolvimento identificou o problema e está trabalhando para restabelecer o acesso o mais breve possível.</p>

      <div class="error-time">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Identificado às {{ errorTime }}
      </div>

      <div class="info-box">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <span>Tente novamente em alguns minutos. Se o problema persistir, entre em contato com o suporte.</span>
      </div>

      <div class="buttons-row">
        <button @click="retry" :disabled="loading || countdown > 0" class="retry-btn">
          <span v-if="loading" class="spinner"></span>
          <span v-if="loading">Verificando conexão...</span>
          <span v-else-if="countdown > 0">Tentar novamente em {{ countdown }}s</span>
          <span v-else>Tentar novamente</span>
        </button>

        <a href="mailto:suporte@aerj.com.br" class="support-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          Falar com o Suporte
        </a>
      </div>

      <span class="error-code">Código: ERR-001</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirebaseError',
  data() {
    return {
      loading: false,
      countdown: 30,
      errorTime: '',
      timer: null
    }
  },
  mounted() {
    const now = new Date()
    this.errorTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    this.startCountdown()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    startCountdown() {
      this.countdown = 30
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    },
    retry() {
      this.loading = true
      setTimeout(() => window.location.reload(), 1500)
    }
  }
}
</script>

<style scoped src="../assets/styles/FirebaseError.css"></style>