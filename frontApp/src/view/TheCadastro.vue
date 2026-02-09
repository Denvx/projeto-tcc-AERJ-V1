<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded-4 overflow-hidden login-container">

      <div class="col-md-6 p-5 bg-dark text-white d-flex flex-column justify-content-center">
        <h3 class="fw-bold mb-4">Criar sua conta</h3>
        <p class="text-secondary mb-4">Preencha os dados para se cadastrar</p>

        <form @submit.prevent="handleRegistration">
          <div class="mb-3">
            <label for="fullName" class="form-label">Nome Completo *</label>
            <div class="input-group">
              <input type="text" id="fullName" v-model="fullName"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.fullName }]"
                placeholder="Digite seu nome completo">
              <span
                :class="['input-group-text', 'bg-dark', 'border-secondary', { 'd-none': !errors.fullName, 'show-icon': errors.fullName }]">
                <img src="/assets/images/icons/atencao.png" class="icon-alert">
              </span>
            </div>
            <div v-if="errors.fullName" class="invalid-feedback">
              {{ errors.fullName }}
            </div>
          </div>

          <div class="mb-3">
            <label for="nickname" class="form-label">Apelido</label>
            <input type="text" id="nickname" v-model="nickname" class="form-control bg-dark text-white border-secondary"
              placeholder="Como gostaria de ser chamado (opcional)">
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email *</label>
            <div class="input-group">
              <input type="email" id="email" v-model="email"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.email }]"
                placeholder="seu.email@example.com">
              <span
                :class="['input-group-text', 'bg-dark', 'border-secondary', { 'd-none': !errors.email, 'show-icon': errors.email }]">
                <img src="/assets/images/icons/atencao.png" class="icon-alert">
              </span>
            </div>
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email }}
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Senha *</label>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.password }]"
                placeholder="••••••••">
              <button class="btn btn-outline-secondary bg-dark text-white border-secondary" type="button"
                @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <span
                :class="['input-group-text', 'bg-dark', 'border-secondary', { 'd-none': !errors.password, 'show-icon': errors.password }]">
                <img src="/assets/images/icons/atencao.png" class="icon-alert">
              </span>
            </div>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar Senha *</label>
            <div class="input-group">
              <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.confirmPassword }]"
                placeholder="••••••••">
              <button class="btn btn-outline-secondary bg-dark text-white border-secondary" type="button"
                @click="showConfirmPassword = !showConfirmPassword">
                <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <span
                :class="['input-group-text', 'bg-dark', 'border-secondary', { 'd-none': !errors.confirmPassword, 'show-icon': errors.confirmPassword }]">
                <img src="/assets/images/icons/atencao.png" class="icon-alert">
              </span>
            </div>
            <div v-if="errors.confirmPassword" class="invalid-feedback">
              {{ errors.confirmPassword }}
            </div>
          </div>

          <button type="submit" class="btn btn-success w-100 mt-3">
            <i class="fas fa-user-plus"></i> Cadastrar
          </button>
        </form>

        <p class="text-center mt-4">
          Já tem uma conta?
          <a href="/login" class="text-success text-decoration-none">Faça login</a>
        </p>
      </div>

      <div class="col-md-6 bg-success text-white p-5 d-flex flex-column justify-content-center">
        <h4 class="fw-bold mb-4">AERJ.</h4>
        <blockquote class="fs-5 fst-italic">
          "A AERJ é um sistema de gestão e monitoramento de transporte que conecta motoristas, passageiros e
          administradores em uma plataforma moderna e segura. O sistema organiza viagens, rotas, pagamentos e
          informações dos usuários, garantindo eficiência e transparência no transporte alternativo."
        </blockquote>
        <br>
        <p class="fw-bold fs-6">Tecnologia e organização para o transporte urbano</p>
        <p class="text-white-50 small">
          Com a AERJ, administradores têm controle total das operações, motoristas ganham mais autonomia e
          passageiros contam com um transporte mais seguro, registrado e confiável.
        </p>
        <div class="mt-4">
          <p class="fw-semibold mt-2">
            Equipe AERJ<br>
            <span class="text-white-50 small">Soluções Inteligentes para Mobilidade</span>
          </p>
          <div class="d-flex align-items-center gap-2 mt-3">
            <img v-for="(avatar, index) in teamAvatars" :key="index" :src="avatar" class="rounded-circle" width="40"
              height="40" alt="Team member">
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-if="alert.show" class="alert-toast" :class="alert.type">
    {{ alert.message }}
  </div>
</template>

<script>
import { registerAuth } from "@/services/authService";
import { createUserProfile } from "@/services/userService";

export default {
  name: 'CadastroAERJ',

  data() {
    return {
      fullName: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,

      alert: {
        show: false,
        message: '',
        type: ''
      },
      teamAvatars: [
        'https://randomuser.me/api/portraits/men/32.jpg',
        'https://randomuser.me/api/portraits/women/45.jpg',
        'https://randomuser.me/api/portraits/men/56.jpg'
      ],

      errors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },

  methods: {
    showAlert(message, type = 'error') {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },

    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    validateForm() {
      this.errors = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      };

      let valid = true;

      if (!this.fullName.trim()) {
        this.errors.fullName = 'Por favor, insira seu nome completo';
        valid = false;
      }

      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Email inválido';
        valid = false;
      }

      if (!this.password || this.password.length < 6) {
        this.errors.password = 'Senha deve ter no mínimo 6 caracteres';
        valid = false;
      }

      if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'As senhas não coincidem';
        valid = false;
      }

      return valid;
    },

    async handleRegistzration() {
      if (!this.validateForm()) return;

      try {
        const user = await registerAuth(this.email, this.password);

        await createUserProfile(user.uid, {
          fullName: this.fullName,
          nickname: this.nickname,
          email: this.email,
          createdAt: new Date()
        });

        this.showAlert('Cadastro realizado com sucesso!', 'success');

        setTimeout(() => {
          this.$router.push({ name: 'login' });
        }, 1500);

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.showAlert('Este e-mail já está cadastrado.', 'error');
        } else if (error.code === 'auth/invalid-email') {
          this.showAlert('E-mail inválido.', 'error');
        } else if (error.code === 'auth/weak-password') {
          this.showAlert('Senha muito fraca.', 'error');
        } else {
          this.showAlert('Erro inesperado. Tente novamente.', 'error');
          console.log(error);
        }
      }
    }
  }
};


</script>

<style src="@/assets/styles/cadastro.css"></style>