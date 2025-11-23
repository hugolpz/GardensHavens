import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  // Load settings from localStorage or use defaults
  const showTaxonImage = ref(loadSetting('showTaxonImage', true))
  const showTaxonRange = ref(loadSetting('showTaxonRange', true))
  const showConservationStatus = ref(loadSetting('showConservationStatus', true))
  const wikimediaUsername = ref(loadSetting('wikimedia-username', ''))

  // Watch for changes and persist to localStorage
  watch(showTaxonImage, (value) => {
    saveSetting('showTaxonImage', value)
  })

  watch(showTaxonRange, (value) => {
    saveSetting('showTaxonRange', value)
  })

  watch(showConservationStatus, (value) => {
    saveSetting('showConservationStatus', value)
  })

  watch(wikimediaUsername, (value) => {
    saveSetting('wikimedia-username', value)
  })

  function loadSetting(key, defaultValue) {
    const stored = localStorage.getItem(key)
    return stored !== null ? JSON.parse(stored) : defaultValue
  }

  function saveSetting(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return {
    showTaxonImage,
    showTaxonRange,
    showConservationStatus,
    wikimediaUsername,
  }
})
