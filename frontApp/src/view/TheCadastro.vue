<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded-4 overflow-hidden login-container">

      <div class="col-md-6 p-5 bg-dark text-white d-flex flex-column justify-content-center">
        <h3 class="fw-bold mb-4">Criar sua conta</h3>
        <p class="text-secondary mb-4">Preencha os dados para se cadastrar</p>

        <form @submit.prevent="handleRegistration">
          <!-- Nome Completo -->
          <div class="mb-3">
            <label for="fullName" class="form-label">Nome Completo *</label>
            <div class="input-group">
              <input type="text" id="fullName" v-model="fullName"
                @blur="validateField('fullName')"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.fullName, 'is-valid': touched.fullName && !errors.fullName && fullName }]"
                placeholder="Digite seu nome completo">
              <span v-if="errors.fullName" class="input-group-text bg-dark border-secondary text-danger">
                <i class="bi bi-exclamation-circle-fill"></i>
              </span>
             
            </div>
            <div v-if="errors.fullName" class="invalid-feedback d-block">
              {{ errors.fullName }}
            </div>
          </div>

          <!-- Apelido -->
          <div class="mb-3">
            <label for="nickname" class="form-label">Apelido</label>
            <input type="text" id="nickname" v-model="nickname" class="form-control bg-dark text-white border-secondary"
              placeholder="Como gostaria de ser chamado (opcional)">
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email *</label>
            <div class="input-group">
              <input type="email" id="email" v-model="email"
                @input="validateEmailRealTime"
                @blur="validateField('email')"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', 
                  { 'is-invalid': errors.email, 
                    'is-valid': touched.email && !errors.email && email }]"
                placeholder="seu.email@example.com">
              <span v-if="errors.email" class="input-group-text bg-dark border-secondary text-danger">
                <i class="bi bi-exclamation-circle-fill"></i>
              </span>
            </div>
            <div v-if="errors.email" class="invalid-feedback d-block">
              {{ errors.email }}
            </div>
            <div v-else-if="email && !isEmailValid && touched.email" class="text-warning small mt-1">
              <i class="bi bi-info-circle"></i> Digite um email válido
            </div>
            <div v-else-if="isEmailValid && email" class="text-success small mt-1">
              <i class="bi bi-check-circle"></i> Email válido!
            </div>
          </div>

          <!-- Senha -->
          <div class="mb-3">
            <label for="password" class="form-label">Senha *</label>
            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                @input="validatePasswordRealTime"
                @blur="validateField('password')"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', 
                  { 'is-invalid': errors.password,
                    'is-valid': touched.password && !errors.password && password.length >= 6 }]"
                placeholder="••••••••">
              <button class="btn btn-outline-secondary bg-dark text-white border-secondary" type="button"
                @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <span v-if="errors.password" class="input-group-text bg-dark border-secondary text-danger">
                <i class="bi bi-exclamation-circle-fill"></i>
              </span>
            </div>
            <div v-if="errors.password" class="invalid-feedback d-block">
              {{ errors.password }}
            </div>
            
            <div v-if="password && touched.password" class="mt-2">
              <div class="d-flex gap-1 mb-1">
                <div class="flex-fill" :class="['password-strength-bar', passwordStrength >= 1 ? 'bg-danger' : 'bg-secondary']"></div>
                <div class="flex-fill" :class="['password-strength-bar', passwordStrength >= 2 ? 'bg-warning' : 'bg-secondary']"></div>
                <div class="flex-fill" :class="['password-strength-bar', passwordStrength >= 3 ? 'bg-success' : 'bg-secondary']"></div>
              </div>
              <small :class="passwordStrengthText.class">{{ passwordStrengthText.text }}</small>
            </div>
          </div>

          <!-- Confirmar Senha -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirmar Senha *</label>
            <div class="input-group">
              <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword"
                @input="validateConfirmPasswordRealTime"
                @blur="validateField('confirmPassword')"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', 
                  { 'is-invalid': errors.confirmPassword,
                    'is-valid': touched.confirmPassword && !errors.confirmPassword && confirmPassword && password === confirmPassword }]"
                placeholder="••••••••">
              <button class="btn btn-outline-secondary bg-dark text-white border-secondary" type="button"
                @click="showConfirmPassword = !showConfirmPassword">
                <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
              <span v-if="errors.confirmPassword" class="input-group-text bg-dark border-secondary text-danger">
                <i class="bi bi-exclamation-circle-fill"></i>
              </span>
            
            </div>
            <div v-if="errors.confirmPassword" class="invalid-feedback d-block">
              {{ errors.confirmPassword }}
            </div>
            <div v-else-if="confirmPassword && password !== confirmPassword && touched.confirmPassword" class="text-warning small mt-1">
              <i class="bi bi-exclamation-triangle"></i> As senhas não coincidem
            </div>
            <div v-else-if="password === confirmPassword && confirmPassword" class="text-success small mt-1">
              <i class="bi bi-check-circle"></i> Senhas coincidem!
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
            <img v-for="(avatar, index) in teamAvatars" 
                 :key="index" 
                 :src="avatar" 
                 class="rounded-circle border border-white" 
                 width="40"
                 height="40" 
                 alt="Team member"
                 @error="handleImageError">
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
import denver from '@/assets/images/denver.jpg';

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
      isEmailValid: false,

      alert: {
        show: false,
        message: '',
        type: ''
      },
      
      teamAvatars: [
        denver
      ],

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

  computed: {
    passwordStrength() {
      if (!this.password) return 0;
      
      let strength = 0;
      
      if (this.password.length >= 6) strength++;
      if (this.password.length >= 8) strength++;
      if (/[A-Z]/.test(this.password) && /[a-z]/.test(this.password)) strength++;
      if (/[0-9]/.test(this.password)) strength++;
      if (/[^A-Za-z0-9]/.test(this.password)) strength++;
      
      return Math.min(strength, 3);
    },

    passwordStrengthText() {
      const texts = {
        0: { text: '', class: '' },
        1: { text: 'Senha fraca', class: 'text-danger' },
        2: { text: 'Senha média', class: 'text-warning' },
        3: { text: 'Senha forte', class: 'text-success' }
      };
      return texts[this.passwordStrength];
    }
  },

  methods: {
    handleImageError(event) {
      console.error('Erro ao carregar imagem:', event.target.src);
      event.target.src = 'https://via.placeholder.com/40';
    },

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

    // Validação de email em tempo real
    validateEmailRealTime() {
      this.touched.email = true;
      this.isEmailValid = this.validateEmail(this.email);
      
      if (this.email && !this.isEmailValid) {
        this.errors.email = '';
      } else {
        this.errors.email = '';
      }
    },

    // Validação de senha em tempo real
    validatePasswordRealTime() {
      this.touched.password = true;
      
      if (this.password && this.password.length < 6) {
        this.errors.password = '';
      } else {
        this.errors.password = '';
      }

      // Revalidar confirmação se já foi preenchida
      if (this.confirmPassword) {
        this.validateConfirmPasswordRealTime();
      }
    },

    // Validação de confirmação de senha em tempo real
    validateConfirmPasswordRealTime() {
      this.touched.confirmPassword = true;
      
      if (this.confirmPassword && this.password !== this.confirmPassword) {
        this.errors.confirmPassword = '';
      } else {
        this.errors.confirmPassword = '';
      }
    },

    // Validação ao sair do campo
    validateField(field) {
      this.touched[field] = true;

      switch(field) {
        case 'fullName':
          if (!this.fullName.trim()) {
            this.errors.fullName = 'Por favor, insira seu nome completo';
          } else {
            this.errors.fullName = '';
          }
          break;
        
        case 'email':
          if (!this.email) {
            this.errors.email = 'Email é obrigatório';
          } else if (!this.validateEmail(this.email)) {
            this.errors.email = 'Email inválido';
          } else {
            this.errors.email = '';
          }
          break;
        
        case 'password':
          if (!this.password) {
            this.errors.password = 'Senha é obrigatória';
          } else if (this.password.length < 6) {
            this.errors.password = 'Senha deve ter no mínimo 6 caracteres';
          } else {
            this.errors.password = '';
          }
          break;
        
        case 'confirmPassword':
          if (!this.confirmPassword) {
            this.errors.confirmPassword = 'Confirme sua senha';
          } else if (this.password !== this.confirmPassword) {
            this.errors.confirmPassword = 'As senhas não coincidem';
          } else {
            this.errors.confirmPassword = '';
          }
          break;
      }
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
          console.error(error);
        }
      }
    }
  }
};
</script>

<style src="@/assets/styles/cadastro.css"></style>

<style scoped>
.password-strength-bar {
  height: 4px;
  border-radius: 2px;
  transition: background-color 0.3s ease;
}
</style>