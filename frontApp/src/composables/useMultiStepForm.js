import { ref } from 'vue'

export function useMultiStepForm(totalSteps) {
  const currentStep = ref(1)

  function nextStep() {
    if (currentStep.value < totalSteps) currentStep.value++
  }

  function previousStep() {
    if (currentStep.value > 1) currentStep.value--
  }

  function goToStep(step) {
    if (step >= 1 && step <= totalSteps) currentStep.value = step
  }

  return {
    currentStep,
    nextStep,
    previousStep,
    goToStep,
    totalSteps,
  }
}