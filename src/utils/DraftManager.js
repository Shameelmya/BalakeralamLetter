const DRAFT_KEY = 'ente_teacherkk_draft'

export const saveDraft = (data) => {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
  } catch (e) {
    console.error("Could not save draft", e)
  }
}

export const loadDraft = () => {
  try {
    const data = localStorage.getItem(DRAFT_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (e) {
    console.error("Could not load draft", e)
  }
  return null
}

export const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch (e) {
    console.error("Could not clear draft", e)
  }
}
