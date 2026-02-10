<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded-4 overflow-hidden login-container">

      <!-- Coluna Esquerda - Formulário -->
      <div class="col-md-6 p-5 bg-dark text-white d-flex flex-column justify-content-center">
        <h3 class="fw-bold mb-4">Bem-vindo a AERJ</h3>
        <p class="text-secondary mb-4">Faça login com sua conta</p>

        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <div class="input-group">
              <input type="email" id="email" v-model="email"
                @input="validateEmailRealTime"
                @blur="validateField('email')"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', 
                  { 'is-invalid': errors.email, 
                    'is-valid': touched.email && !errors.email && email }]"
                placeholder="example.vigiamed@example.com">
              <span v-if="errors.email" class="input-group-text bg-dark border-secondary text-danger">
                <i class="bi bi-exclamation-circle-fill"></i>
              </span>
              <span v-else-if="touched.email && isEmailValid && email" class="input-group-text bg-dark border-secondary text-success">
                <i class="bi bi-check-circle-fill"></i>
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

          <!-- Campo Senha -->
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
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
              <span v-else-if="touched.password && password.length >= 6" class="input-group-text bg-dark border-secondary text-success">
                <i class="bi bi-check-circle-fill"></i>
              </span>
            </div>
            <div v-if="errors.password" class="invalid-feedback d-block">
              {{ errors.password }}
            </div>
            <div v-else-if="password && password.length < 6 && touched.password" class="text-warning small mt-1">
              <i class="bi bi-info-circle"></i> Senha deve ter no mínimo 6 caracteres
            </div>

            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe">
                <label class="form-check-label text-secondary" for="rememberMe">
                  Lembre de mim
                </label>
              </div>
              <a href="#" class="text-success text-decoration-none" @click.prevent="openResetModal">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <button type="submit" class="btn btn-success w-100 mt-3">
            <i class="fas fa-sign-in-alt"></i> Entrar
          </button>
        </form>

        <div class="text-center my-3 text-secondary">ou</div>

        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-light rounded-circle social-btn" @click="loginGoogle">
            <i class="bi bi-google google-icon"></i>
          </button>
          <button class="btn btn-light rounded-circle social-btn" @click="loginApple">
            <i class="bi bi-apple apple-icon"></i>
          </button>
          <button class="btn btn-light rounded-circle social-btn" @click="loginFacebook">
            <i class="bi bi-facebook facebook-icon"></i>
          </button>
        </div>

        <p class="text-center mt-4">
          Não tem uma conta?
          <a href="/cadastro" class="text-success text-decoration-none">Cadastre-se</a>
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

    <!-- Popup de Recuperação de Senha -->
    <ResetPasswordModal 
      :show="showResetModal" 
      @close="closeResetModal"
      @alert="handleModalAlert" 
    />

    <!-- Toast de Alerta -->
    <div v-if="alert.show" class="alert-toast" :class="alert.type">
      {{ alert.message }}
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import ResetPasswordModal from '@/components/ResetPasswordModal.vue';
import denver from '@/assets/images/denver.jpg';

export default {
  name: 'LoginAERJ',

  components: {
    ResetPasswordModal
  },

  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isEmailValid: false,
      showResetModal: false,

      alert: {
        show: false,
        message: '',
        type: ''
      },
      
      teamAvatars: [
        denver
      ],

      errors: {
        email: '',
        password: ''
      },

      touched: {
        email: false,
        password: false
      }
    };
  },

  methods: {
    handleImageError(event) {
      console.error('Erro ao carregar imagem:', event.target.src);
      event.target.src = 'https://ui-avatars.com/api/?name=AERJ&background=198754&color=fff&size=40';
    },

    showAlert(message, type = 'error') {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },

    handleModalAlert(alertData) {
      this.showAlert(alertData.message, alertData.type);
    },

    openResetModal() {
      this.showResetModal = true;
    },

    closeResetModal() {
      this.showResetModal = false;
    },

    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    validateEmailRealTime() {
      this.touched.email = true;
      this.isEmailValid = this.validateEmail(this.email);
      
      if (this.email && !this.isEmailValid) {
        this.errors.email = '';
      } else {
        this.errors.email = '';
      }
    },

    validatePasswordRealTime() {
      this.touched.password = true;
      
      if (this.password && this.password.length < 6) {
        this.errors.password = '';
      } else {
        this.errors.password = '';
      }
    },

    validateField(field) {
      this.touched[field] = true;

      switch(field) {
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
      }
    },

    validateForm() {
      this.errors = {
        email: '',
        password: ''
      };

      let valid = true;

      if (!this.email || !this.validateEmail(this.email)) {
        this.errors.email = 'Email inválido';
        valid = false;
      }

      if (!this.password || this.password.length < 6) {
        this.errors.password = 'Senha deve ter no mínimo 6 caracteres';
        valid = false;
      }

      return valid;
    },

    async handleLogin() {
      if (!this.validateForm()) return;

      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);

        this.showAlert('Login realizado com sucesso!', 'success');

        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 1500);

      } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          this.showAlert('Email ou senha incorretos.', 'error');
        } else if (error.code === 'auth/wrong-password') {
          this.showAlert('Senha incorreta.', 'error');
        } else if (error.code === 'auth/too-many-requests') {
          this.showAlert('Muitas tentativas. Tente novamente mais tarde.', 'error');
        } else {
          this.showAlert('Erro ao fazer login.', 'error');
          console.error(error);
        }
      }
    },

    loginGoogle() {
      this.showAlert('Login com Google em desenvolvimento.', 'error');
    },

    loginApple() {
      this.showAlert('Login com Apple em desenvolvimento.', 'error');
    },

    loginFacebook() {
      this.showAlert('Login com Facebook em desenvolvimento.', 'error');
    }
  }
};
</script>

<style src="@/assets/styles/login.css"></style>