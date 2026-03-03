<template>
  <div>

    <!-- CPF -->
    <div class="mb-3">
      <label class="form-label">CPF *</label>
      <div class="input-group">
        <span class="input-group-text bg-dark border-secondary text-secondary">
          <i class="bi bi-person-vcard"></i>
        </span>
        <input
          type="text"
          v-model="local.cpf"
          @input="onInputCpf"
          class="form-control bg-dark text-white border-secondary"
          placeholder="000.000.000-00"
          maxlength="14"
        />
      </div>
      <small class="text-secondary">Somente números</small>
    </div>

    <!-- Data nascimento + Gênero -->
    <div class="row g-3 mb-3">
      <div class="col-md-6">
        <label class="form-label">Data de Nascimento *</label>
        <div class="input-group">
          <span class="input-group-text bg-dark border-secondary text-secondary">
            <i class="bi bi-calendar3"></i>
          </span>
          <input
            type="date"
            v-model="local.dataNascimento"
            class="form-control bg-dark text-white border-secondary"
          />
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Gênero</label>
        <div class="input-group">
          <span class="input-group-text bg-dark border-secondary text-secondary">
            <i class="bi bi-person"></i>
          </span>
          <select v-model="local.sexo" class="form-select bg-dark text-white border-secondary">
            <option value="" disabled>Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="NB">Não-binário</option>
            <option value="NI">Prefiro não informar</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Telefone -->
    <div class="mb-4">
      <label class="form-label">Telefone / WhatsApp *</label>
      <div class="input-group">
        <span class="input-group-text bg-dark border-secondary text-secondary">
          <i class="bi bi-telephone"></i>
        </span>
        <input
          type="tel"
          v-model="local.telefone"
          @input="onInputPhone"
          class="form-control bg-dark text-white border-secondary"
          placeholder="(00) 00000-0000"
        />
      </div>
      <small class="text-secondary">Usado apenas para notificações importantes</small>
    </div>

    <!-- Rodapé -->
    <div class="d-flex align-items-center justify-content-between">
      <span class="text-secondary small">Passo <strong class="text-white">1 de 3</strong></span>
      <button type="button" class="btn btn-success d-flex align-items-center gap-2" @click="$emit('next')">
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

// Sincroniza com o formState do pai
watch(local, (val) => Object.assign(props.formData, val), { deep: true })

function onInputCpf() {
  let v = local.cpf.replace(/\D/g, '').slice(0, 11)
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2')
  local.cpf = v
}

function onInputPhone() {
  let v = local.telefone.replace(/\D/g, '').slice(0, 11)
  if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{1,5})/, '($1) $2')
  local.telefone = v
}
</script>