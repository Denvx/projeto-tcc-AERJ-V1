<template>
    <div v-if="show" class="reset-overlay">
        <div class="reset-box">
            <h4 class="mb-3 text-white">Recuperar senha</h4>

            <p class="text-secondary mb-3">
                Digite seu e-mail para receber o link de redefinição.
            </p>

            <div class="mb-3">
                <input type="email" 
                    v-model="email" 
                    @input="validateEmailRealTime"
                    :class="['form-control', 'bg-dark', 'text-white', 'border-secondary',
                        { 'is-invalid': errors.email, 
                          'is-valid': touched && !errors.email && email }]"
                    placeholder="seuemail@email.com" />
                <div v-if="errors.email" class="invalid-feedback d-block">
                    {{ errors.email }}
                </div>
                <div v-else-if="email && !isEmailValid && touched" class="text-warning small mt-1">
                    <i class="bi bi-info-circle"></i> Digite um email válido
                </div>
                <div v-else-if="isEmailValid && email" class="text-success small mt-1">
                    <i class="bi bi-check-circle"></i> Email válido!
                </div>
            </div>

            <div class="d-flex gap-2">
                <button class="btn btn-success w-100" @click="sendReset" :disabled="sending">
                    <span v-if="sending">
                        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enviando...
                    </span>
                    <span v-else>
                        <i class="bi bi-envelope"></i> Enviar
                    </span>
                </button>
                <button class="btn btn-outline-light w-100" @click="closeModal" :disabled="sending">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default {
    props: {
        show: Boolean
    },

    data() {
        return {
            email: '',
            isEmailValid: false,
            touched: false,
            sending: false,
            errors: {
                email: ''
            }
        };
    },

    watch: {
        show(newVal) {
            if (!newVal) {
                // Reseta os campos quando o modal é fechado
                this.email = '';
                this.isEmailValid = false;
                this.touched = false;
                this.errors.email = '';
            }
        }
    },

    methods: {
        validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },

        validateEmailRealTime() {
            this.touched = true;
            this.isEmailValid = this.validateEmail(this.email);
            
            if (this.email && !this.isEmailValid) {
                this.errors.email = '';
            } else {
                this.errors.email = '';
            }
        },

        async sendReset() {
            if (!this.email) {
                this.errors.email = 'Informe seu e-mail';
                this.$emit('alert', {
                    message: 'Informe seu e-mail.',
                    type: 'error'
                });
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.errors.email = 'E-mail inválido';
                this.$emit('alert', {
                    message: 'E-mail inválido.',
                    type: 'error'
                });
                return;
            }

            this.sending = true;

            try {
                await sendPasswordResetEmail(auth, this.email);

                this.$emit('alert', {
                    message: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.',
                    type: 'success'
                });

                this.closeModal();
            } catch (error) {
                let message = 'Erro ao enviar e-mail de recuperação.';

                if (error.code === 'auth/user-not-found') {
                    message = 'E-mail não encontrado.';
                } else if (error.code === 'auth/invalid-email') {
                    message = 'E-mail inválido.';
                } else if (error.code === 'auth/too-many-requests') {
                    message = 'Muitas tentativas. Tente novamente mais tarde.';
                }

                this.$emit('alert', {
                    message,
                    type: 'error'
                });

                console.error('Erro ao enviar email de recuperação:', error);
            } finally {
                this.sending = false;
            }
        },

        closeModal() {
            this.email = '';
            this.isEmailValid = false;
            this.touched = false;
            this.errors.email = '';
            this.$emit('close');
        }
    }
};
</script>

<style src="@/assets/styles/resetPassword.css"></style>