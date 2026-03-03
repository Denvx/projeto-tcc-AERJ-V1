<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Período / Semestre *</label>
      <div class="input-group" style="position:relative;">
        <span class="field-icon"><i class="bi bi-layers"></i></span>
        <select
          v-model="local.periodAcademico"
          @blur="validate('periodAcademico')"
          @change="validate('periodAcademico')"
          :class="['form-control', { 'is-invalid': errors.periodAcademico, 'is-valid': local.periodAcademico }]"
          style="padding-left:2.6rem; cursor:pointer;"
        >
          <option value="" disabled>Selecione o período</option>
          <option v-for="n in 10" :key="n" :value="n">{{ n }}º período</option>
        </select>
      </div>
      <span v-if="errors.periodAcademico" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.periodAcademico }}</span>
    </div>

    <div class="mb-3">
      <label class="form-label">Comprovante de Matrícula *</label>
      <div
        class="upload-area"
        :class="{ 'upload-error': errors.documentoAcademico, 'upload-success': local.documentoAcademico }"
        @click="$refs.docInput.click()"
      >
        <i class="bi fs-3" :class="local.documentoAcademico ? 'bi-check-circle text-success' : 'bi-cloud-upload'"></i>
        <p class="mb-0 mt-2 small">
          {{ local.documentoAcademico ? local.documentoAcademico.name : 'Clique para enviar (PDF, JPG, PNG)' }}
        </p>
      </div>
      <input ref="docInput" type="file" accept=".pdf,.jpg,.jpeg,.png" class="d-none" @change="onFileChange" />
      <span v-if="errors.documentoAcademico" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.documentoAcademico }}</span>
      <small v-else class="text-secondary">Comprovante de matrícula atualizado</small>
    </div>

    <div class="mb-3 security-notice">
      <i class="bi bi-shield-check"></i>
      <span>Seus documentos são protegidos e usados apenas para validação. Aprovação em até 24h.</span>
    </div>

    <div class="mb-4">
      <div class="lgpd-box" :class="{ 'lgpd-error': errors.lgpdConsent, 'lgpd-ok': local.lgpdConsent }">
        <div class="form-check mb-0">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="local.lgpdConsent"
            @change="validate('lgpdConsent')"
            id="lgpdConsent"
          />
          <label class="form-check-label small" for="lgpdConsent" style="cursor:pointer; color:rgba(255,255,255,0.75);">
            Li e concordo com o
            <a href="#" class="text-success text-decoration-none" @click.stop>tratamento dos meus dados pessoais</a>
            conforme a
            <a href="#" class="text-success text-decoration-none" @click.stop>Política de Privacidade</a>
            e a LGPD. Autorizo a coleta das informações acima para fins de validação do meu cadastro no sistema AERJ. *
          </label>
        </div>
      </div>
      <span v-if="errors.lgpdConsent" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.lgpdConsent }}</span>
      <small v-else-if="local.lgpdConsent" class="text-success"><i class="bi bi-check-circle"></i> Consentimento registrado</small>
      <small v-else class="text-secondary">O consentimento é obrigatório para prosseguir</small>
    </div>

    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-outline-secondary d-flex align-items-center gap-2" @click="$emit('previous')" :disabled="isSubmitting">
        <i class="bi bi-arrow-left"></i> Voltar
      </button>
      <button type="button" class="btn btn-success d-flex align-items-center gap-2" disabled title="Integração com API Java pendente">
        <i class="bi bi-check-circle"></i> Concluir Cadastro
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRef } from 'vue'

const props = defineProps({
  formData:     { type: Object,  required: true },
  isSubmitting: { type: Boolean, default: false },
})
defineEmits(['submit', 'previous'])

const local  = toRef(props, 'formData').value
const errors = reactive({ periodAcademico: '', documentoAcademico: '', lgpdConsent: '' })

function validate(field) {
  switch (field) {
    case 'periodAcademico':
      errors.periodAcademico = local.periodAcademico ? '' : 'Selecione o período'
      break
    case 'documentoAcademico':
      errors.documentoAcademico = local.documentoAcademico ? '' : 'Envie o comprovante de matrícula'
      break
    case 'lgpdConsent':
      errors.lgpdConsent = local.lgpdConsent ? '' : 'É necessário aceitar os termos para prosseguir'
      break
  }
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) { local.documentoAcademico = file; validate('documentoAcademico') }
}
</script>

<style scoped>
.field-icon {
  position: absolute; left: 12px; top: 50%;
  transform: translateY(-50%);
  color: #888; z-index: 5; pointer-events: none;
}
.form-control { padding-left: 2.6rem !important; }
.field-error { display: block; color: #ff6b6b; font-size: 0.8rem; margin-top: 4px; }
.upload-area {
  border: 1.5px dashed #3a3a3a;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  background: rgba(255,255,255,0.02);
  transition: border-color 0.2s;
  color: #888;
}
.upload-area:hover { border-color: rgba(255,255,255,0.3); }
.upload-success { border-color: #198754 !important; color: #198754; }
.upload-error   { border-color: #ff6b6b !important; }
.security-notice {
  display: flex; align-items: flex-start; gap: 8px;
  background: rgba(25,135,84,0.12);
  color: rgba(255,255,255,0.75);
  font-size: 0.8rem;
  padding: 10px 12px;
  border-radius: 8px;
}
.security-notice i { color: #198754; margin-top: 2px; flex-shrink: 0; }
.lgpd-box {
  padding: 12px;
  border-radius: 8px;
  border: 1.5px solid #3a3a3a;
  background: rgba(255,255,255,0.02);
  transition: border-color 0.2s;
}
.lgpd-ok    { border-color: #198754; }
.lgpd-error { border-color: #ff6b6b; }
</style>