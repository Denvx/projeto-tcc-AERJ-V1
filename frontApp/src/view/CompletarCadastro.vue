<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
    <div class="row shadow-lg rounded-4 overflow-hidden login-container">

      <!-- ── Coluna Esquerda – Formulário ── -->
      <div class="col-md-6 p-5 bg-dark text-white d-flex flex-column justify-content-center">

        <!-- Header: nome do usuário + botão sair -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <small class="fw-bold mb-0">
            Olá, <strong class="text-white fw-bold">{{ userDisplayName }}</strong>
          </small>
          <button
            type="button"
            class="btn btn-sm px-2 py-1 d-flex align-items-center gap-1"
            @click="handleLogout"
            title="Sair da conta"
            style="background-color: transparent; border: 1px solid #6c757d; color: #fff;
                   font-size: 0.7rem; border-radius: 3px; font-weight: bold;"
          >
            <i class="bi bi-box-arrow-right" style="font-size: 0.75rem;"></i>
            <span>Sair</span>
          </button>
        </div>

        <!-- Título -->
        <h3 class="fw-bold mb-1">Complete seu Cadastro</h3>
        <p class="text-secondary mb-4 small">
          Para sua segurança, coletamos os dados abaixo somente após seu consentimento.
        </p>

        <!-- Step Indicator -->
        <div class="step-indicator mb-4 justify-content-center">
          <div v-for="step in 3" :key="step" class="step-group">
            <div class="step-circle" :class="{ active: currentStep >= step }">
              <i v-if="currentStep > step" class="bi bi-check-lg"></i>
              <span v-else>{{ step }}</span>
            </div>
            <div v-if="step < 3" class="step-line" :class="{ active: currentStep > step }"></div>
          </div>
        </div>

        <!-- Loading enquanto busca usuário -->
        <div v-if="isCheckingStatus" class="text-center py-4">
          <div class="spinner-border text-success"></div>
          <p class="text-secondary mt-3 small">Verificando cadastro...</p>
        </div>

        <!-- Steps -->
        <div v-if="!isCheckingStatus">
          <Step1Form
            v-show="currentStep === 1"
            :form-data="formState"
            @next="handleStep1Next"
          />
          <Step2Form
            v-show="currentStep === 2"
            :form-data="formState"
            @previous="previousStep"
            @next="handleStep2Next"
          />
          <Step3Form
            v-show="currentStep === 3"
            :form-data="formState"
            @previous="previousStep"
            @submit="handleStep3Submit"
            :is-submitting="isSubmitting"
          />
        </div>

        <p class="text-center mt-4 small">
          Precisa de ajuda?
          <a href="#" class="text-success text-decoration-none">Fale com o suporte</a>
        </p>
      </div>

      <!-- ── Coluna Direita – Informações ── -->
      <div class="col-md-6 bg-success text-white p-5 d-flex flex-column justify-content-between">

        <div>
          <!-- Ícone + título -->
          <div class="mb-4">
            <div
              class="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
              style="width:52px; height:52px; background: rgba(0,0,0,0.15);"
            >
              <i class="bi bi-shield-check fs-4"></i>
            </div>
            <h4 class="fw-bold mb-2">Quase lá, Universitário!</h4>
            <p class="text-white-50 small">
              Complete seu cadastro para desbloquear acesso às rotas, carteira digital
              e benefícios exclusivos do estudante.
            </p>
          </div>

          <!-- Benefícios -->
          <ul class="list-unstyled d-flex flex-column gap-3 mb-4">
            <li v-for="benefit in benefits" :key="benefit.title" class="d-flex align-items-start gap-3">
              <div
                class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style="width:22px; height:22px; background:rgba(255,255,255,0.2); font-size:11px;"
              >
                <i class="bi bi-check-lg"></i>
              </div>
              <div>
                <span class="fw-semibold d-block" style="font-size:13px;">{{ benefit.title }}</span>
                <span class="text-white-50" style="font-size:12px;">{{ benefit.desc }}</span>
              </div>
            </li>
          </ul>

          <!-- Time de aprovação -->
          <div class="rounded-3 p-3" style="background: rgba(0,0,0,0.15);">
            <p
              class="text-white-50 mb-3"
              style="font-size:10px; letter-spacing:.1em; text-transform:uppercase; font-weight:600;"
            >
              Time de aprovação
            </p>
            <div class="d-flex flex-column gap-2">
              <div v-for="member in team" :key="member.initials" class="d-flex align-items-center gap-2">
                <div
                  class="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                  style="width:34px; height:34px; font-size:12px; background:rgba(255,255,255,0.2);"
                >
                  {{ member.initials }}
                </div>
                <div class="flex-grow-1">
                  <p class="mb-0 fw-semibold" style="font-size:13px;">{{ member.name }}</p>
                  <p class="mb-0 text-white-50" style="font-size:11px;">{{ member.role }}</p>
                </div>
                <span class="d-flex align-items-center gap-1" style="font-size:11px;">
                  <span class="online-dot rounded-circle"></span>
                  Online
                </span>
              </div>
            </div>
            <p
              class="mt-3 mb-0 fst-italic text-white-50"
              style="font-size:12px; border-top:1px solid rgba(255,255,255,0.15); padding-top:10px;"
            >
              "Nossa equipe está online para validar seus documentos em tempo recorde."
            </p>
          </div>
        </div>

        <!-- Prova social -->
        <div class="d-flex align-items-center gap-3 mt-4">
          <div class="d-flex">
            <img
              v-for="(av, i) in teamAvatars"
              :key="i"
              :src="av"
              class="rounded-circle border border-white"
              style="width:28px; height:28px; object-fit:cover;"
              :style="{ marginLeft: i === 0 ? '0' : '-6px' }"
              @error="handleImageError"
            />
          </div>
          <p class="mb-0 text-white-50 small">
            Junte-se a <strong class="text-white">3.450+ estudantes</strong> já cadastrados
          </p>
        </div>

      </div>    
    </div>

    <!-- Alert Toast -->
    <div v-if="alert.show" class="alert-toast" :class="alert.type">
      {{ alert.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'

import Step1Form from '@/components/completeRegister/Step1Form.vue'
import Step2Form from '@/components/completeRegister/Step2Form.vue'
import Step3Form from '@/components/completeRegister/Step3Form.vue'

import { useMultiStepForm } from '@/composables/useMultiStepForm'
import { useAlert }         from '@/composables/useAlert'

import { auth }           from '@/firebase/firebaseConfig'
import { getCurrentUser } from '@/services/authService'
import { getUserData }    from '@/services/userService'

import denver from '@/assets/images/denver.jpg'

// ── Router / Composables ──────────────────────────────────────────
const router      = useRouter()
const form        = useMultiStepForm(3)
const currentStep = form.currentStep
const { alert, showSuccess, showError } = useAlert()

// ── State ─────────────────────────────────────────────────────────
const isCheckingStatus = ref(true)
const isSubmitting     = ref(false)
const userDisplayName  = ref('Usuário')
const teamAvatars      = ref([denver])

// Dados do usuário vindos do Firebase/Firestore — usados no payload
const currentUser = ref(null)
const userData    = ref(null)

// ── Form state compartilhado entre os 3 steps ─────────────────────
const formState = reactive({
  // Step 1 — dados pessoais sensíveis (LGPD)
  cpf:            '',
  dataNascimento: '',
  telefone:       '',
  sexo:           '',
  // Step 2 — dados acadêmicos
  registration:   '',   // matrícula
  course:         '',   // curso
  institution:    '',   // instituição
  turno:          '',
  // Step 3 — documento + consentimento
  periodAcademico:     '',
  documentoAcademico:  null,
  lgpdConsent:         false,
})

// ── Dados estáticos do painel direito ─────────────────────────────
const benefits = [
  { title: 'Acesso a rotas e horários em tempo real', desc: 'Nunca perca seu ônibus'              },
  { title: 'Emissão de carteira digital instantânea', desc: 'Gerada imediatamente após aprovação' },
  { title: 'Validação de documentos em até 24h',      desc: 'Processo ágil e seguro'              },
]

const team = [
  { initials: 'AO', name: 'Ana Oliveira', role: 'Coordenadora de Rotas' },
  { initials: 'CS', name: 'Carlos Silva', role: 'Analista de Cadastro'  },
]

// ── onMounted: busca dados do usuário logado ──────────────────────
onMounted(async () => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      router.push({ name: 'login' })
      return
    }

    currentUser.value = user
    userData.value    = await getUserData(user.uid)

    // Exibe nickname ou primeiro nome na saudação
    userDisplayName.value =
      userData.value?.nickname            ||
      userData.value?.fullName?.split(' ')[0] ||
      user.displayName                    ||
      'Usuário'

  } catch (error) {
    console.error('[CompletarCadastro] Erro ao carregar usuário:', error)
  } finally {
    isCheckingStatus.value = false
  }
})

// ── Navegação ─────────────────────────────────────────────────────
function previousStep() {
  form.previousStep()
}

// ── Validações mínimas no front (API Java valida o restante) ──────
function validateStep1() {
  if (formState.cpf.replace(/\D/g, '').length !== 11) {
    showError('Informe um CPF válido')
    return false
  }
  if (!formState.dataNascimento) {
    showError('Informe sua data de nascimento')
    return false
  }
  if (formState.telefone.replace(/\D/g, '').length < 10) {
    showError('Informe um telefone válido')
    return false
  }
  return true
}

function validateStep2() {
  if (!formState.institution.trim()) {
    showError('Informe sua instituição de ensino')
    return false
  }
  if (!formState.course.trim()) {
    showError('Informe seu curso')
    return false
  }
  if (!formState.turno) {
    showError('Selecione o turno')
    return false
  }
  return true
}

function validateStep3() {
  if (!formState.periodAcademico) {
    showError('Selecione o período')
    return false
  }
  if (!formState.documentoAcademico) {
    showError('Envie o comprovante de matrícula')
    return false
  }
  if (!formState.lgpdConsent) {
    showError('É necessário aceitar os termos para prosseguir')
    return false
  }
  return true
}

function handleStep1Next() {
  if (validateStep1()) form.nextStep()
}

function handleStep2Next() {
  if (validateStep2()) form.nextStep()
}

// ── Submit — botão desabilitado, payload pronto para API ──────────
async function handleStep3Submit() {
  if (!validateStep3()) return

  isSubmitting.value = true
  try {
    const user = currentUser.value
    const data = userData.value

    // Payload espelhando StudentEntitie da API Java
    // Campos que a API define internamente não são enviados:
    // id, status, role, statusCadastro, address, log, warnings, studentTrips
    const payload = {
      firebaseUid:        user.uid,
      name:               data?.fullName  || '',
      nickName:           data?.nickname  || '',
      email:              user.email      || '',
      cpf:                formState.cpf.replace(/\D/g, ''),
      dataNascimento:     formState.dataNascimento,
      telephone:          formState.telefone.replace(/\D/g, ''),
      sexo:               formState.sexo,
      registration:       formState.registration,
      course:             formState.course,
      institution:        formState.institution,
      turno:              formState.turno,
      periodAcademico:    formState.periodAcademico,
      lgpdConsent:        formState.lgpdConsent,
      academicDocumentUrl: null, // será preenchido após upload do arquivo
    }

    console.log('[CompletarCadastro] Payload para API Java:', payload)

    // TODO: descomentar quando a API Java estiver pronta
    // const token = await user.getIdToken()
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/students/complete`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(payload)
    // })
    // if (!response.ok) {
    //   const err = await response.json()
    //   throw new Error(err.message || 'Erro ao completar cadastro')
    // }

    showSuccess('Cadastro concluído! Aguarde a validação.')
    setTimeout(() => router.push({ name: 'dashAlunos' }), 1800)

  } catch (error) {
    showError(error.message || 'Erro ao finalizar cadastro. Tente novamente.')
    console.error('[CompletarCadastro] Erro:', error)
  } finally {
    isSubmitting.value = false
  }
}

// ── Logout ────────────────────────────────────────────────────────
async function handleLogout() {
  try {
    await signOut(auth)
    router.push({ name: 'login' })
  } catch {
    showError('Erro ao sair da conta')
  }
}

function handleImageError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=AERJ&background=198754&color=fff&size=40'
}
</script>

<style scoped>
.step-indicator {
  display: flex;
  align-items: center;
}
.step-group {
  display: flex;
  align-items: center;
}
.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  transition: all 0.3s;
}
.step-circle.active {
  background: #198754;
  box-shadow: 0 0 0 3px rgba(25, 135, 84, 0.25);
}
.step-line {
  width: 40px;
  height: 2px;
  background: #6c757d;
  margin: 0 10px;
  transition: background 0.3s;
}
.step-line.active {
  background: #198754;
}
.online-dot {
  width: 7px;
  height: 7px;
  background: #a3f0c4;
  box-shadow: 0 0 5px #a3f0c4;
  display: inline-block;
  animation: blink 2s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
}
</style>

<style src="@/assets/styles/login.css"></style>