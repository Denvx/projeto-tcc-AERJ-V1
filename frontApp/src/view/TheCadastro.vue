<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded-4 overflow-hidden login-container">

      <div class="col-md-6 p-5 bg-dark text-white d-flex flex-column justify-content-center">
        <h3 class="fw-bold mb-4">Criar sua conta</h3>
        <p class="text-secondary mb-4">Preencha os dados para se cadastrar</p>

        <form @submit.prevent="handleRegistration">

          <!-- Nome -->
          <div class="mb-3">
            <label class="form-label">Nome Completo *</label>
            <input type="text" v-model="fullName" @input="onInputFullName" @blur="validateField('fullName')"
              :class="inputClass('fullName')" placeholder="Digite seu nome completo" />

            <div v-if="errors.fullName" class="invalid-feedback d-block">
              {{ errors.fullName }}
            </div>
          </div>

          <!-- Apelido -->
          <div class="mb-3">
            <label class="form-label">Apelido</label>
            <input type="text" v-model="nickname" @input="onInputNickname"
              class="form-control bg-dark text-white border-secondary"
              placeholder="Como gostaria de ser chamado (opcional)" />
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label class="form-label">Email *</label>

            <input type="email" v-model="email" @input="onInputEmail" @blur="validateField('email')"
              :class="inputClass('email')" placeholder="seu.email@example.com" />

            <div v-if="errors.email" class="invalid-feedback d-block">
              {{ errors.email }}
            </div>

            <div v-else-if="touched.email && isEmailValid === true" class="text-success small mt-1">

              <i class="bi bi-check-circle"></i> Email válido!
            </div>
          </div>

          <!-- Senha -->
          <div class="mb-3">
            <label class="form-label">Senha *</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" @input="onInputPassword"
              @blur="validateField('password')" :class="inputClass('password')" placeholder="••••••••" />

            <div v-if="errors.password" class="invalid-feedback d-block">
              {{ errors.password }}
            </div>
          </div>

          <!-- Confirmar -->
          <div class="mb-3">
            <label class="form-label">Confirmar Senha *</label>
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
              @input="onInputConfirmPassword" @blur="validateField('confirmPassword')"
              :class="inputClass('confirmPassword')" placeholder="••••••••" />

            <div v-if="errors.confirmPassword" class="invalid-feedback d-block">
              {{ errors.confirmPassword }}
            </div>

            <div v-else-if="
              touched.confirmPassword &&
              confirmPassword &&
              password === confirmPassword
            " class="text-success small mt-1">
              <i class="bi bi-check-circle"></i> Senhas coincidem!
            </div>

          </div>

          <button class="btn btn-success w-100 mt-3">
            <i class="fas fa-user-plus"></i> Cadastrar
          </button>
        </form>

        <p class="text-center mt-4">
          Já tem uma conta?
          <a href="/login" class="text-success text-decoration-none">Faça login</a>
        </p>
      </div>

      <!-- Coluna Direita - Informações -->
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
            <img v-for="(avatar, index) in teamAvatars" :key="index" :src="avatar"
              class="rounded-circle border border-white" width="40" height="40" alt="Team member"
              @error="handleImageError">
          </div>
        </div>
      </div>

    </div>

    <div v-if="alert.show" class="alert-toast" :class="alert.type">
      {{ alert.message }}
    </div>
  </div>
</template>

<script>
import { registerAuth } from '@/services/authService';
import { createUserProfile } from '@/services/userService';
import denver from '@/assets/images/denver.jpg';

import { limitEntry } from '@/utils/helpers/limitEntry';
import { LIMITS } from '@/utils/validators/limits';
import { validateEmail } from '@/utils/validators/email';

export default {
  name: 'CadastroAERJ',

  data() {
    return {
      fullName: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',

      isEmailValid: null,
      showPassword: false,
      showConfirmPassword: false,

      alert: {
        show: false,
        message: '',
        type: ''
      },

      teamAvatars: [denver],

      errors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },

      touched: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false
      }
    };
  },

  methods: {
    inputClass(field) {
      return [
        'form-control',
        'bg-dark',
        'text-white',
        'border-secondary',
        {
          'is-invalid': this.errors[field],
          'is-valid': this.touched[field] && !this.errors[field] && this[field]
        }
      ];
    },

    onInputFullName() {
      this.fullName = limitEntry(this.fullName, LIMITS.NAME);
      this.touched.fullName = true;
      this.errors.fullName = '';
    },

    onInputNickname() {
      this.nickname = limitEntry(this.nickname, LIMITS.NICKNAME);
    },

    onInputEmail() {
      this.touched.email = true;

      const { isValid, error } = validateEmail(this.email);

      this.isEmailValid = isValid;
      this.errors.email = error;
    }
    ,

    onInputPassword() {
      this.password = limitEntry(this.password, LIMITS.PASSWORD);
      this.touched.password = true;
      this.errors.password = '';

      if (this.confirmPassword) this.validateField('confirmPassword');
    },

    onInputConfirmPassword() {
      this.touched.confirmPassword = true;

      if (!this.confirmPassword) {
        this.errors.confirmPassword = 'Confirme sua senha';
        return;
      }

      if (this.confirmPassword !== this.password) {
        this.errors.confirmPassword = 'As senhas não coincidem';
      } else {
        this.errors.confirmPassword = '';
      }
    }
    ,

    validateField(field) {
      this.touched[field] = true;

      switch (field) {
        case 'fullName':
          this.errors.fullName =
            this.fullName.trim().length >= 3
              ? ''
              : 'Informe seu nome completo';
          break;

        case 'email': {
          const { isValid, error } = validateEmail(this.email);
          this.errors.email = isValid ? '' : error;
          break;
        }

        case 'password':
          if (!this.password) this.errors.password = 'Senha obrigatória';
          else if (this.password.length < 6)
            this.errors.password = 'Mínimo 6 caracteres';
          else this.errors.password = '';
          break;

        case 'confirmPassword':
          if (!this.confirmPassword)
            this.errors.confirmPassword = 'Confirme sua senha';
          else if (this.password !== this.confirmPassword)
            this.errors.confirmPassword = 'As senhas não coincidem';
          else this.errors.confirmPassword = '';
          break;
      }
    },

    validateForm() {
      ['fullName', 'email', 'password', 'confirmPassword'].forEach(this.validateField);
      return !Object.values(this.errors).some(e => e);
    },

    showAlert(message, type = 'error') {
      this.alert = { show: true, message, type };
      setTimeout(() => (this.alert.show = false), 3000);
    },

    async handleRegistration() {
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
        setTimeout(() => this.$router.push({ name: 'login' }), 1500);

      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          this.showAlert('Este e-mail já está cadastrado.', 'error');
        } else if (err.code === 'auth/invalid-email') {
          this.showAlert('E-mail inválido.', 'error');
        } else if (err.code === 'auth/weak-password') {
          this.showAlert('Senha muito fraca.', 'error');
        } else {
          this.showAlert('Erro inesperado. Tente novamente.', 'error');
          console.log(err);
        }
      }
    }
  }
};
</script>

<style src="@/assets/styles/cadastro.css"></style>