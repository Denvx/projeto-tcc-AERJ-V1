<template>
  <div>
    <div class="mb-3">
      <label class="form-label">CPF *</label>
      <div class="input-group" style="position:relative;">
        <span class="field-icon"><i class="bi bi-person-vcard"></i></span>
        <input
          type="text"
          v-model="local.cpf"
          @input="onInputCpf"
          @blur="validate('cpf')"
          :class="['form-control', { 'is-invalid': errors.cpf, 'is-valid': touched.cpf && !errors.cpf && local.cpf }]"
          placeholder="000.000.000-00"
          maxlength="14"
        />
      </div>
      <span v-if="errors.cpf" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.cpf }}</span>
      <small v-else class="text-secondary">Somente números</small>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label class="form-label">Data de Nascimento *</label>
        <div class="input-group" style="position:relative;">
          <span class="field-icon"><i class="bi bi-calendar3"></i></span>
          <input
            type="date"
            v-model="local.dataNascimento"
            @blur="validate('dataNascimento')"
            :class="['form-control', { 'is-invalid': errors.dataNascimento, 'is-valid': touched.dataNascimento && !errors.dataNascimento && local.dataNascimento }]"
          />
        </div>
        <span v-if="errors.dataNascimento" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.dataNascimento }}</span>
      </div>

      <div class="col-md-6">
        <label class="form-label">Gênero</label>
        <div class="input-group" style="position:relative;">
          <span class="field-icon"><i class="bi bi-person"></i></span>
          <select v-model="local.sexo" class="form-control" style="padding-left:2.6rem; cursor:pointer;">
            <option value="" disabled>Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="NB">Não-binário</option>
            <option value="NI">Prefiro não informar</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label">Telefone / WhatsApp *</label>
      <div class="input-group" style="position:relative;">
        <span class="field-icon"><i class="bi bi-telephone"></i></span>
        <input
          type="tel"
          v-model="local.telefone"
          @input="onInputPhone"
          @blur="validate('telefone')"
          :class="['form-control', { 'is-invalid': errors.telefone, 'is-valid': touched.telefone && !errors.telefone && local.telefone }]"
          placeholder="(00) 00000-0000"
        />
      </div>
      <span v-if="errors.telefone" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.telefone }}</span>
      <small v-else class="text-secondary">Usado apenas para notificações importantes</small>
    </div>

    <div class="d-flex align-items-center justify-content-between">
      <span class="text-secondary small">Passo <strong class="text-white">1 de 3</strong></span>
      <button type="button" class="btn btn-success d-flex align-items-center gap-2" @click="handleNext">
        Próximo <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRef } from 'vue'

const props = defineProps({ formData: { type: Object, required: true } })
const emit  = defineEmits(['next'])

const local   = toRef(props, 'formData').value
const errors  = reactive({ cpf: '', dataNascimento: '', telefone: '' })
const touched = reactive({ cpf: false, dataNascimento: false, telefone: false })

function onInputCpf() {
  let v = local.cpf.replace(/\D/g, '').slice(0, 11)
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2')
  local.cpf = v
  if (touched.cpf) validate('cpf')
}

function onInputPhone() {
  let v = local.telefone.replace(/\D/g, '').slice(0, 11)
  if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2')
  local.telefone = v
  if (touched.telefone) validate('telefone')
}

function validate(field) {
  touched[field] = true
  switch (field) {
    case 'cpf':
      errors.cpf = local.cpf.replace(/\D/g, '').length === 11 ? '' : 'Informe um CPF válido (11 dígitos)'
      break
    case 'dataNascimento':
      errors.dataNascimento = local.dataNascimento ? '' : 'Informe sua data de nascimento'
      break
    case 'telefone':
      errors.telefone = local.telefone.replace(/\D/g, '').length >= 10 ? '' : 'Informe um telefone válido'
      break
  }
}

function handleNext() {
  validate('cpf'); validate('dataNascimento'); validate('telefone')
  if (!errors.cpf && !errors.dataNascimento && !errors.telefone) emit('next')
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
</style>