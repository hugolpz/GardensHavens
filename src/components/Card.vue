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

      <!-- Image Section -->
      <div v-if="cardData.image" class="image-section">
        <div class="ribbon ribbon-label" :style="{ backgroundColor: groupColor }">Image</div>
        <img :src="cardData.image" :alt="cardData.taxonName" class="image" />
      </div>

      <!-- Range Map Section -->
      <div v-if="cardData.rangeMap" class="image-section">
        <div class="ribbon ribbon-label" :style="{ backgroundColor: groupColor }">Range</div>
        <img :src="cardData.rangeMap" :alt="`Range of ${cardData.taxonName}`" class="image" />
      </div>

      <!-- Description -->
      <div v-if="cardData.description" class="description">
        <p>{{ cardData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchCardData } from '@/utils/fetchCardData'
import { getGroupColor } from '@/data/constants'

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

.image-section {
  display: flex;
  flex-direction: column;
}

.image {
  width: 100%;
  height: 188px;
  object-fit: cover;
  margin: 3px;
}

.description {
  padding: 1rem;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.description p {
  margin: 0;
}
</style>
