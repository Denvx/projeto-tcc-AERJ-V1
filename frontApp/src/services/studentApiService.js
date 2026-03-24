const API_URL = process.env.VUE_APP_API_URL

export async function getStatusCadastro(email) {
  try {
    const response = await fetch(
      `${API_URL}/student/status?email=${encodeURIComponent(email)}`
    )

    // 404 = estudante ainda não existe na API = NAO_CADASTRADO
    if (response.status === 404) {
      return 404/*'NAO_CADASTRADO'*/
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar status: ${response.status}`)
    }

    const status = await response.text()
    return status

  } catch (error) {
    // Só loga se não for 404 tratado acima
    console.error('[studentApiService] Erro:', error)
    throw error
  }
}