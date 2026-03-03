<template>
  <div>

    <!-- Período acadêmico -->
    <div class="mb-3">
      <label class="form-label">Período / Semestre *</label>
      <div class="input-group">
        <span class="input-group-text bg-dark border-secondary text-secondary">
          <i class="bi bi-layers"></i>
        </span>
        <select v-model="local.periodAcademico" class="form-select bg-dark text-white border-secondary">
          <option value="" disabled>Selecione o período</option>
          <option v-for="n in 10" :key="n" :value="n">{{ n }}º período</option>
        </select>
      </div>
    </div>

    <!-- Upload comprovante de matrícula -->
    <div class="mb-3">
      <label class="form-label">Comprovante de Matrícula *</label>
      <div
        class="upload-area border rounded-3 p-4 text-center"
        :class="local.documentoAcademico ? 'border-success' : 'border-secondary'"
        @click="$refs.docInput.click()"
        style="cursor: pointer; background: rgba(255,255,255,0.02);"
      >
        <i
          class="bi fs-3"
          :class="local.documentoAcademico
            ? 'bi-check-circle text-success'
            : 'bi-cloud-upload text-secondary'"
        ></i>
        <p
          class="mb-0 mt-2 small"
          :class="local.documentoAcademico ? 'text-success' : 'text-secondary'"
        >
          {{ local.documentoAcademico
              ? local.documentoAcademico.name
              : 'Clique para enviar (PDF, JPG, PNG)' }}
        </p>
      </div>
      <input
        ref="docInput"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        class="d-none"
        @change="onFileChange"
      />
      <small class="text-secondary">
        Será salvo como <code>academicDocumentUrl</code> após upload
      </small>
    </div>

    <!-- Aviso de segurança -->
    <div class="mb-3">
      <div
        class="d-flex align-items-start gap-2 small py-2 px-3 rounded-3"
        style="background: rgba(25,135,84,0.15); color: rgba(255,255,255,0.75);"
      >
        <i class="bi bi-shield-check text-success mt-1"></i>
        <span>
          Seus documentos são protegidos e usados apenas para validação.
          Aprovação em até 24h.
        </span>
      </div>
    </div>

    <!-- Consentimento LGPD -->
    <div class="mb-4">
      <div
        class="p-3 rounded-3 border"
        :class="local.lgpdConsent ? 'border-success' : 'border-secondary'"
        style="background: rgba(255,255,255,0.02);"
      >
        <div class="form-check mb-0">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="local.lgpdConsent"
            id="lgpdConsent"
          />
          <label
            class="form-check-label small"
            for="lgpdConsent"
            style="color: rgba(255,255,255,0.75); cursor: pointer;"
          >
            Li e concordo com o
            <a href="#" class="text-success text-decoration-none" @click.stop>
              tratamento dos meus dados pessoais
            </a>
            conforme a
            <a href="#" class="text-success text-decoration-none" @click.stop>
              Política de Privacidade
            </a>
            e a LGPD. Autorizo a coleta das informações acima para fins de validação
            do meu cadastro no sistema AERJ. *
          </label>
        </div>
      </div>
      <small v-if="!local.lgpdConsent" class="text-secondary">
        O consentimento é obrigatório para prosseguir
      </small>
      <small v-else class="text-success">
        <i class="bi bi-check-circle"></i> Consentimento registrado
      </small>
    </div>

    <!-- Rodapé -->
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-outline-secondary d-flex align-items-center gap-2"
        @click="$emit('previous')"
        :disabled="isSubmitting"
      >
        <i class="bi bi-arrow-left"></i> Voltar
      </button>

      <!--
        Botão desabilitado intencionalmente.
        Será habilitado quando a integração com a API Java estiver pronta.
        O payload está montado e logado no console em CompletarCadastro.vue.
      -->
      <button
        type="button"
        class="btn btn-success d-flex align-items-center gap-2"
        disabled
        title="Em desenvolvimento — integração com API Java pendente"
      >
        <i class="bi bi-check-circle"></i>
        Concluir Cadastro
      </button>
    </div>

  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  formData:     { type: Object,  required: true },
  isSubmitting: { type: Boolean, default: false },
})

const local = reactive({ ...props.formData })

watch(local, (val) => Object.assign(props.formData, val), { deep: true })

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) local.documentoAcademico = file
}
</script>

<style scoped>
.upload-area { transition: border-color 0.2s; }
.upload-area:hover { border-color: rgba(255, 255, 255, 0.3) !important; }
</style>