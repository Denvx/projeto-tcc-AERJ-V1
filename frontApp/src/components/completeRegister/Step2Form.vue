<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Instituição de Ensino *</label>
      <div class="input-group" style="position:relative;">
        <span class="field-icon"><i class="bi bi-building"></i></span>
        <input
          type="text"
          v-model="local.institution"
          @blur="validate('institution')"
          @input="onInputInstitution"
          :class="['form-control', { 'is-invalid': errors.institution, 'is-valid': touched.institution && !errors.institution && local.institution }]"
          placeholder="Nome da universidade ou faculdade"
        />
      </div>
      <span v-if="errors.institution" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.institution }}</span>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-8">
        <label class="form-label">Curso *</label>
        <div class="input-group" style="position:relative;">
          <span class="field-icon"><i class="bi bi-book"></i></span>
          <input
            type="text"
            v-model="local.course"
            @blur="validate('course')"
            @input="onInputCourse"
            :class="['form-control', { 'is-invalid': errors.course, 'is-valid': touched.course && !errors.course && local.course }]"
            placeholder="Ex: Engenharia Civil"
          />
        </div>
        <span v-if="errors.course" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.course }}</span>
      </div>

      <div class="col-md-4">
        <label class="form-label">Turno *</label>
        <div class="input-group" style="position:relative;">
          <span class="field-icon"><i class="bi bi-clock"></i></span>
          <select
            v-model="local.turno"
            @blur="validate('turno')"
            :class="['form-control', { 'is-invalid': errors.turno }]"
            style="padding-left:2.6rem; cursor:pointer;"
          >
            <option value="" disabled>Turno</option>
            <option value="M">Manhã</option>
            <option value="T">Tarde</option>
            <option value="N">Noite</option>
            <option value="I">Integral</option>
          </select>
        </div>
        <span v-if="errors.turno" class="field-error"><i class="bi bi-exclamation-circle"></i> {{ errors.turno }}</span>
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label">Matrícula Estudantil <span class="text-secondary">(opcional)</span></label>
      <div class="input-group" style="position:relative;">
        <span class="field-icon"><i class="bi bi-card-text"></i></span>
        <input
          type="text"
          v-model="local.registration"
          class="form-control"
          placeholder="Número de matrícula"
        />
      </div>
    </div>

    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-outline-secondary d-flex align-items-center gap-2" @click="$emit('previous')">
        <i class="bi bi-arrow-left"></i> Voltar
      </button>
      <button type="button" class="btn btn-success d-flex align-items-center gap-2" @click="handleNext">
        Próximo <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRef } from 'vue'

const props = defineProps({ formData: { type: Object, required: true } })
const emit  = defineEmits(['next', 'previous'])

const local   = toRef(props, 'formData').value
const errors  = reactive({ institution: '', course: '', turno: '' })
const touched = reactive({ institution: false, course: false, turno: false })

function onInputInstitution() {
  if (touched.institution) validate('institution')
}

function onInputCourse() {
  if (touched.course) validate('course')
}

function validate(field) {
  touched[field] = true
  switch (field) {
    case 'institution':
      errors.institution = local.institution.trim().length >= 3 ? '' : 'Informe sua instituição de ensino'
      break
    case 'course':
      errors.course = local.course.trim().length >= 2 ? '' : 'Informe seu curso'
      break
    case 'turno':
      errors.turno = local.turno ? '' : 'Selecione o turno'
      break
  }
}

function handleNext() {
  validate('institution'); validate('course'); validate('turno')
  if (!errors.institution && !errors.course && !errors.turno) emit('next')
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