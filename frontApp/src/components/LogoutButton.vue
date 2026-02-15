<template>
  <button
    :class="buttonClasses"
    :disabled="isLoading"
    @click="handleLogout"
    :title="text || 'Sair'"
  >
    <!-- Loading Spinner -->
    <span v-if="isLoading" class="logout-button__spinner"></span>

    <!-- Icon -->
    <span v-else-if="showIcon" class="logout-button__icon">
      <slot name="icon">
        <!-- Ícone padrão de logout (SVG) -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
      </slot>
    </span>

    <!-- Text -->
    <span v-if="text" class="logout-button__text">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script>
import { logoutAuth } from '@/services/authService';
import { clearUserCache } from '@/services/userService';

export default {
  name: 'LogoutButton',

  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'ghost', 'icon'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    text: {
      type: String,
      default: 'Sair'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    confirmBeforeLogout: {
      type: Boolean,
      default: false
    },
    confirmMessage: {
      type: String,
      default: 'Tem certeza que deseja sair?'
    },
    redirect: {
      type: Boolean,
      default: true
    },
    redirectTo: {
      type: String,
      default: 'login'
    }
  },

  data() {
    return {
      isLoading: false
    };
  },

  computed: {
    buttonClasses() {
      return [
        'logout-button',
        `logout-button--${this.variant}`,
        `logout-button--${this.size}`,
        {
          'logout-button--loading': this.isLoading,
          'logout-button--icon-only': !this.text
        }
      ];
    }
  },

  methods: {
    async handleLogout() {
      // Confirmação (se habilitada)
      if (this.confirmBeforeLogout) {
        const confirmed = window.confirm(this.confirmMessage);
        if (!confirmed) return;
      }

      this.isLoading = true;

      try {
        // Emitir evento antes do logout
        this.$emit('before-logout');

        // Fazer logout
        await logoutAuth();

        // Limpar cache de usuário
        clearUserCache();

        // Emitir evento de sucesso
        this.$emit('logout-success');

        // Redirecionar ou emitir evento
        if (this.redirect) {
          await this.$router.push({ name: this.redirectTo });
        } else {
          this.$emit('logout-complete');
        }

      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        
        // Emitir evento de erro
        this.$emit('logout-error', error);

        // Mostrar alerta (opcional - pode ser customizado via slot)
        alert('Erro ao sair. Tente novamente.');
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style src="@/components/LogoutButton.css"></style>