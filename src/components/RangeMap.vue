<template>
  <div class="range-map-wrapper">
    <div v-if="loading" class="range-map-loading">
      <p>Loading species range data...</p>
    </div>
    <div v-else-if="error" class="range-map-error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="range-map-info">
      <p class="occurrence-count">{{ occurrences.length }} occurrences found</p>
    </div>
    <div ref="mapContainer" class="range-map-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from 'vue'
import { createRangeMap } from '@/utils/rangeMap'
import { getTaxonKey, fetchOccurrences } from '@/utils/gbif'

// Define component properties
const props = defineProps({
  binomial: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Species Range',
  },
  width: {
    type: Number,
    default: 600,
  },
  maxOccurrences: {
    type: Number,
    default: 300,
  },
})

const { binomial, title, width, maxOccurrences } = toRefs(props)
const mapContainer = ref(null)
const occurrences = ref([])
const loading = ref(true)
const error = ref(null)
const usageKey = ref(null)

/**
 * Fetch occurrence data from GBIF
 */
const loadOccurrences = async () => {
  if (!binomial.value) {
    error.value = 'No species name provided'
    loading.value = false
    return
  }

  loading.value = true
  error.value = null

  try {
    // Step 1: Get the GBIF taxon key from binomial name
    const key = await getTaxonKey(binomial.value)

    if (!key) {
      error.value = `Could not find GBIF taxon key for "${binomial.value}"`
      loading.value = false
      return
    }

    usageKey.value = key
    console.log(`Found GBIF key ${key} for "${binomial.value}"`)

    // Step 2: Fetch occurrences using the taxon key
    const data = await fetchOccurrences(key, maxOccurrences.value)

    if (data.length === 0) {
      error.value = 'No occurrence data found for this species'
    } else {
      occurrences.value = data
      console.log(`Loaded ${data.length} occurrences for ${binomial.value}`)
    }
  } catch (err) {
    error.value = 'Failed to load occurrence data'
    console.error('Error loading occurrences:', err)
  } finally {
    loading.value = false
  }
}

/**
 * Initialize the range map
 */
const initMap = () => {
  if (!mapContainer.value || occurrences.value.length === 0) return

  // Clear any existing content
  mapContainer.value.innerHTML = ''

  try {
    createRangeMap(mapContainer.value, width.value, title.value, occurrences.value)
    console.log(`Range map created with ${occurrences.value.length} points`)
  } catch (err) {
    error.value = 'Failed to create range map'
    console.error('Failed to create range map:', err)
  }
}

// Initialize on mount
onMounted(async () => {
  await loadOccurrences()
  if (occurrences.value.length > 0) {
    initMap()
  }
})

// Re-load data and re-initialize when binomial changes
watch(binomial, async () => {
  await loadOccurrences()
  if (occurrences.value.length > 0) {
    initMap()
  }
})

// Re-initialize map when dimensions change
watch([width, title], () => {
  if (occurrences.value.length > 0) {
    initMap()
  }
})
</script>

<style scoped>
.range-map-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.range-map-loading,
.range-map-error {
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #666;
}

.range-map-error {
  color: #d33;
}

.range-map-info {
  width: 100%;
  padding: 0.5rem 0;
}

.occurrence-count {
  font-size: 0.75rem;
  color: #666;
  margin: 0;
  text-align: right;
  font-style: italic;
}

.range-map-container {
  display: inline-block;
  width: 100%;
  max-width: 100%;
}

.range-map-container :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

/* Tooltip styling for occurrence points */
.range-map-container :deep(.occurrence-point) {
  cursor: pointer;
  transition: r 0.2s ease;
}

.range-map-container :deep(.occurrence-point:hover) {
  r: 4;
  fill-opacity: 1;
}
</style>
