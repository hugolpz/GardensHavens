<template>
  <div class="card" :style="{ borderColor: groupColor }">
    <div v-if="loading" class="card-loading">
      <p>Loading...</p>
    </div>

    <div v-else-if="error" class="card-error">
      <div class="ribbon" :style="{ backgroundColor: groupColor }">
        {{ binomialName }}
      </div>
      <p class="error-message">{{ error }}</p>
    </div>

    <div v-else class="card-content">
      <!-- Taxon Name Ribbon -->
      <div class="ribbon" :style="{ backgroundColor: groupColor }">
        {{ cardData.taxonName }}
      </div>

      <!-- Common Name Row -->
      <div v-if="cardData.commonName" class="common-name-row">
        {{ cardData.commonName }}
      </div>

      <!-- Image Section -->
      <div v-if="settings.showTaxonImage && cardData.image" class="image-section">
        <div class="ribbon ribbon-label" :style="{ backgroundColor: groupColor }">Image</div>
        <img :src="cardData.image" :alt="cardData.taxonName" class="image" />
      </div>

      <!-- Range Map Section -->
      <div v-if="settings.showTaxonRange && cardData.rangeMap" class="image-section">
        <div class="ribbon ribbon-label" :style="{ backgroundColor: groupColor }">Range</div>
        <img :src="cardData.rangeMap" :alt="`Range of ${cardData.taxonName}`" class="image" />
      </div>

      <!-- Short Description -->
      <div v-if="cardData.shortDescription" class="short-description">
        <div class="ribbon ribbon-label" :style="{ backgroundColor: groupColor }">
          Short Description
        </div>
        <div class="description-content">{{ cardData.shortDescription }}</div>
      </div>

      <!-- Long Description -->
      <div v-if="cardData.longDescription" class="long-description">
        <div class="ribbon ribbon-label" :style="{ backgroundColor: groupColor }">
          Long Description
        </div>
        <div class="description-content" v-html="cardData.longDescription"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchCardData } from '@/utils/fetchCardData'
import { getGroupColor } from '@/data/constants'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  binomialName: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    default: 'plant',
  },
})

const { locale } = useI18n()
const settings = useSettingsStore()
const cardData = ref(null)
const loading = ref(true)
const error = ref(null)
const groupColor = ref(getGroupColor(props.group))

async function loadData() {
  loading.value = true
  error.value = null

  try {
    const data = await fetchCardData(props.binomialName, locale.value)
    cardData.value = data
  } catch (err) {
    error.value = 'Failed to load species data'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

// Reload data when locale changes
watch(locale, () => {
  loadData()
})
</script>

<style scoped>
.card {
  background-color: white;
  border: 3px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-loading,
.card-error {
  padding: 2rem;
  text-align: center;
}

.error-message {
  color: #d33;
  margin-top: 1rem;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.ribbon {
  color: black;
  background-color: rgb(180, 250, 180);
  border-collapse: separate;
  display: block;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding: 0.75rem 1rem;
  text-align: center;
}

.ribbon-label {
  font-size: 14px;
  padding: 0.5rem 1rem;
}

.common-name-row {
  padding: 0.75rem 1rem;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  text-align: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e0e0e0;
  color: #666;
}

.image-section {
  display: flex;
  flex-direction: column;
}

.image {
  width: 100%;
  height: 230px;
  object-fit: cover;
  margin: 3px;
}

.short-description,
.long-description {
  display: flex;
  flex-direction: column;
}

.description-content {
  padding: 1rem;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.short-description .description-content {
  font-style: italic;
  font-weight: 500;
}

.description-content p {
  margin: 0;
}

.description-content :deep(a) {
  color: #36c;
  text-decoration: none;
}

.description-content :deep(a:hover) {
  text-decoration: underline;
}

.description-content :deep(b),
.description-content :deep(strong) {
  font-weight: 700;
}

.description-content :deep(i),
.description-content :deep(em) {
  font-style: italic;
}

.description-content :deep(sup) {
  font-size: 0.75em;
  vertical-align: super;
}
</style>
