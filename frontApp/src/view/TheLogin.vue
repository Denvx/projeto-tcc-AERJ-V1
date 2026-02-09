<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded-4 overflow-hidden login-container">

      <!-- Coluna Esquerda - Formulário -->
      <div class="col-md-6 p-5 bg-dark text-white d-flex flex-column justify-content-center">
        <h3 class="fw-bold mb-4">Bem-vindo a AERJ</h3>
        <p class="text-secondary mb-4">Faça login com sua conta</p>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <div class="input-group">
              <input type="email" id="email" v-model="email"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.email }]"
                placeholder="example.vigiamed@example.com">
              <span
                :class="['input-group-text', 'bg-dark', 'border-secondary', { 'd-none': !errors.email, 'show-icon': errors.email }]">
                <img src="/assets/images/icons/atencao.png" class="icon-alert">
              </span>
            </div>
            <div v-if="errors.email" class="invalid-feedback">
              {{ errors.email }}
            </div>
          </div>

          <!-- Campo Senha -->
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <div class="input-group">
              <input type="password" id="password" v-model="password"
                :class="['form-control', 'bg-dark', 'text-white', 'border-secondary', { 'is-invalid': errors.password }]"
                placeholder="••••••••">
              <span
                :class="['input-group-text', 'bg-dark', 'border-secondary', { 'd-none': !errors.password, 'show-icon': errors.password }]">
                <img src="/assets/images/icons/atencao.png" class="icon-alert">
              </span>
            </div>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>

            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe">
                <label class="form-check-label text-secondary" for="rememberMe">
                  Lembre de mim
                </label>
              </div>
              <a href="#" class="text-success text-decoration-none" @click.prevent="forgotPassword">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <button type="submit" class="btn btn-success w-100 mt-3"> <i class="fas fa-sing-in-alt"></i>Entrar</button>
        </form>

        <div class="text-center my-3 text-secondary">ou</div>

        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-light rounded-circle social-btn" @click="loginGoogle('google')">
            <i class="bi bi-google google-icon"></i>
          </button>
          <button class="btn btn-light rounded-circle social-btn" @click="loginApple('apple')">
            <i class="bi bi-apple apple-icon"></i>
          </button>
          <button class="btn btn-light rounded-circle social-btn" @click="loginFacebook('facebook')">
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default {
  name: 'LoginAERJ',

  data() {
    return {
      email: '',
      password: '',

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
        email: '',
        password: ''
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
        if (error.code === 'auth/user-not-found') {
          this.showAlert('Usuário não encontrado.', 'error');
        } else if (error.code === 'auth/wrong-password') {
          this.showAlert('Senha incorreta.', 'error');
        } else {
          this.showAlert('Erro ao fazer login.', 'error');
        }
      }
    },

    loginGoogle(){
      this.showAlert('Login com Google não implementado ainda.', 'error');
    },
    loginApple(){
      this.showAlert('Login com Apple não implementado ainda.', 'error');
    },
    loginFacebook(){
      this.showAlert('Login com Facebook não implementado ainda.', 'error');
    }
  }
};

</script>

<style src="@/assets/styles/login.css"></style>