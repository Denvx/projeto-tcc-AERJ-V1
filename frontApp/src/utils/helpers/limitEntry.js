export function limitEntry(valor, max) {
  if (!valor) return ''
  return valor.length > max ? valor.slice(0, max) : valor
}