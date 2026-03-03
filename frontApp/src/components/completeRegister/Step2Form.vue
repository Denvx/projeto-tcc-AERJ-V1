<template>
  <div>

    <!-- Instituição -->
    <div class="mb-3">
      <label class="form-label">Instituição de Ensino *</label>
      <div class="input-group">
        <span class="input-group-text bg-dark border-secondary text-secondary">
          <i class="bi bi-building"></i>
        </span>
        <input
          type="text"
          v-model="local.institution"
          class="form-control bg-dark text-white border-secondary"
          placeholder="Nome da universidade ou faculdade"
        />
      </div>
    </div>

    <!-- Curso + Turno -->
    <div class="row g-3 mb-3">
      <div class="col-md-8">
        <label class="form-label">Curso *</label>
        <div class="input-group">
          <span class="input-group-text bg-dark border-secondary text-secondary">
            <i class="bi bi-book"></i>
          </span>
          <input
            type="text"
            v-model="local.course"
            class="form-control bg-dark text-white border-secondary"
            placeholder="Ex: Engenharia Civil"
          />
        </div>
      </div>

      <div class="col-md-4">
        <label class="form-label">Turno *</label>
        <div class="input-group">
          <span class="input-group-text bg-dark border-secondary text-secondary">
            <i class="bi bi-clock"></i>
          </span>
          <select v-model="local.turno" class="form-select bg-dark text-white border-secondary">
            <option value="" disabled>Turno</option>
            <option value="M">Manhã</option>
            <option value="T">Tarde</option>
            <option value="N">Noite</option>
            <option value="I">Integral</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Matrícula (opcional) -->
    <div class="mb-4">
      <label class="form-label">
        Matrícula Estudantil <span class="text-secondary">(opcional)</span>
      </label>
      <div class="input-group">
        <span class="input-group-text bg-dark border-secondary text-secondary">
          <i class="bi bi-card-text"></i>
        </span>
        <input
          type="text"
          v-model="local.registration"
          class="form-control bg-dark text-white border-secondary"
          placeholder="Número de matrícula"
        />
      </div>
    </div>

    <!-- Rodapé -->
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-outline-secondary d-flex align-items-center gap-2"
        @click="$emit('previous')"
      >
        <i class="bi bi-arrow-left"></i> Voltar
      </button>
      <button
        type="button"
        class="btn btn-success d-flex align-items-center gap-2"
        @click="$emit('next')"
      >
        Próximo <i class="bi bi-arrow-right"></i>
      </button>
    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  formData: { type: Object, required: true },
})

const local = reactive({ ...props.formData })

watch(local, (val) => Object.assign(props.formData, val), { deep: true })
</script>