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
              <input type="email" id="email" v-model="email" @input="onInputEmail" @blur="validateField('email')"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary',
                  {
                    'is-invalid': errors.email,
                    'is-valid': touched.email && !errors.email && email
                  }
                ]" placeholder="example.vigiamed@example.com">
            </div>

            <div v-if="errors.email" class="invalid-feedback d-block">
              {{ errors.email }}
            </div>

            <div v-else-if="!errors.email && email" class="text-success small mt-1">
              <i class="bi bi-check-circle"></i> Email válido!
            </div>
          </div>


          <!-- Campo Senha -->
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>

            <div class="input-group">
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                @input="onInputPassword" @blur="validateField('password')" :class="['form-control', 'bg-dark', 'text-white', 'border-secondary',
                  {
                    'is-invalid': errors.password,
                    'is-valid': touched.password && !errors.password && password
                  }
                ]" placeholder="••••••••">

              <button class="btn btn-outline-secondary bg-dark text-white border-secondary" type="button"
                @click="showPassword = !showPassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>

            <div v-if="errors.password" class="invalid-feedback d-block">
              {{ errors.password }}
            </div>

            <div v-else-if="!errors.password && password" class="text-success small mt-1">
              <i class="bi bi-check-circle"></i> Senha válida!
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
            <img v-for="(avatar, index) in teamAvatars" :key="index" :src="avatar"
              class="rounded-circle border border-white" width="40" height="40" alt="Team member"
              @error="handleImageError">
          </div>
        </div>
      </div>

    </div>

    <!-- Popup de Recuperação de Senha -->
    <ResetPasswordModal :show="showResetModal" @close="closeResetModal" @alert="handleModalAlert" />

    <!-- Toast de Alerta -->
    <div v-if="alert.show" class="alert-toast" :class="alert.type">
      {{ alert.message }}
    </div>
  </div>
</template>

<script>
import { loginAuth } from '@/services/authService';
import { getUserData } from '@/services/userService';
import ResetPasswordModal from '@/components/ResetPasswordModal.vue';
import denver from '@/assets/images/denver.jpg';

import { limitEntry } from '@/utils/helpers/limitEntry';
import { LIMITS } from '@/utils/validators/limits';
import { validateEmail } from '@/utils/validators/email';
import { validatePassword } from '@/utils/validators/password';

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
      showResetModal: false,
      isLoading: false, // ✅ Estado de loading

      alert: {
        show: false,
        message: '',
        type: ''
      },

      teamAvatars: [denver],

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
      event.target.src =
        'https://ui-avatars.com/api/?name=AERJ&background=198754&color=fff&size=40';
    },

    // ===== INPUT HANDLERS =====

    onInputEmail() {
      this.email = limitEntry(this.email, LIMITS.EMAIL).trim();
      const { error } = validateEmail(this.email);
      this.errors.email = error;
    },

    onInputPassword() {
      this.password = limitEntry(this.password, LIMITS.PASSWORD);
      this.touched.password = true;
      const { error } = validatePassword(this.password);
      this.errors.password = error;
    },

    // ===== FIELD VALIDATION =====

    validateField(field) {
      this.touched[field] = true;

      if (field === 'email') {
        const { error } = validateEmail(this.email);
        this.errors.email = error || (!this.email ? 'Email é obrigatório' : '');
      }

      if (field === 'password') {
        const { error } = validatePassword(this.password);
        this.errors.password = error || (!this.password ? 'Senha é obrigatória' : '');
      }
    },

    validateForm() {
      const emailValidation = validateEmail(this.email);
      const passwordValidation = validatePassword(this.password);

      this.errors.email =
        emailValidation.error || (!this.email ? 'Email é obrigatório' : '');

      this.errors.password =
        passwordValidation.error || (!this.password ? 'Senha é obrigatória' : '');

      return !this.errors.email && !this.errors.password;
    },

    // ===== ALERT SYSTEM =====

    showAlert(message, type = 'error') {
      this.alert = { show: true, message, type };

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },

    handleModalAlert(alertData) {
      this.showAlert(alertData.message, alertData.type);
    },

    // ===== RESET PASSWORD MODAL =====

    openResetModal() {
      this.showResetModal = true;
    },

    closeResetModal() {
      this.showResetModal = false;
    },

    async handleLogin() {
      if (!this.validateForm()) {
        this.showAlert('Por favor, corrija os erros no formulário.');
        return;
      }

      this.isLoading = true;

      try {
        const user = await loginAuth(this.email, this.password);
        const userData = await getUserData(user.uid);

        if (!userData) {
          throw new Error('Perfil do usuário não encontrado');
        }
        this.showAlert('Login realizado com sucesso!', 'success');
        
        setTimeout(() => {
          const targetRoute = userData.isAdmin ? 'dashAdmin' : 'dashAlunos';
          this.$router.push({ name: targetRoute });
        }, 1000);

      } catch (error) {
        this.handleLoginError(error);
      } finally {
        this.isLoading = false;
      }
    },

    handleLoginError(error) {
      const errorMessages = {
        'auth/user-not-found': 'Email não cadastrado.',
        'auth/invalid-credential': 'Email ou senha incorretos.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-email': 'Email inválido.',
        'auth/user-disabled': 'Esta conta foi desativada.',
        'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.'
      };

      const message = errorMessages[error.code] || 'Erro ao fazer login. Tente novamente.';
      
      this.showAlert(message);
      console.error('Erro no login:', error);
    },

    // ===== SOCIAL LOGIN (FUTURO) =====

    loginGoogle() {
      this.showAlert('Login com Google em desenvolvimento.', 'info');
    },

    loginApple() {
      this.showAlert('Login com Apple em desenvolvimento.', 'info');
    },

    loginFacebook() {
      this.showAlert('Login com Facebook em desenvolvimento.', 'info');
    }
  }
};
</script>


<style src="@/assets/styles/login.css"></style>