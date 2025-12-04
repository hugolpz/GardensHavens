<template>
  <div
    v-if="status"
    :id="`${binomial}-iucn`"
    :class="`iucn-status-container ${icon ? 'iucn-icon' : 'iucn-scale'}`"
  >
    <img :src="statusImagePath" :alt="`IUCN Status: ${fullStatus}`" class="iucn-status-image" />
  </div>
  <div v-else-if="isLoading && !icon" class="iucn-loading">
    <p>Loading IUCN status for {{ binomial }}...</p>
  </div>
  <div v-else-if="!icon" class="iucn-error">
    <p>Status not found for {{ binomial }} (or species not assessed).</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { getTaxonKey, getIucnStatus } from '@/utils/gbif'

// Define the component properties
const props = defineProps({
  // The species binomial name (e.g., 'Panthera tigris')
  binomial: {
    type: String,
    required: true,
  },
  // Whether to display the small square icon (true) or large status scale (false)
  icon: {
    type: Boolean,
    default: false,
  },
})

// State
const status = ref(null) // The two-letter code (LC, EN, CR, etc.)
const isLoading = ref(false)

// --- Constants ---

// Mapping between the GBIF/IUCN full status name and the two-letter code
const STATUS_MAP = [
  {
    long: 'EXTINCT',
    short: 'EX',
    description: 'Extinct',
    color: '#000000',
  },
  {
    long: 'EXTINCT_IN_THE_WILD',
    short: 'EW',
    description: 'Extinct in the Wild',
    color: '#650462',
  },
  {
    long: 'CRITICALLY_ENDANGERED',
    short: 'CR',
    description: 'Critically Endangered',
    color: '#D30000',
  },
  {
    long: 'ENDANGERED',
    short: 'EN',
    description: 'Endangered',
    color: '#F08000',
  },
  {
    long: 'VULNERABLE',
    short: 'VU',
    description: 'Vulnerable',
    color: '#F0C800',
  },
  {
    long: 'NEAR_THREATENED',
    short: 'NT',
    description: 'Near Threatened',
    color: '#94C800',
  },
  {
    long: 'LEAST_CONCERN',
    short: 'LC',
    description: 'Least Concern',
    color: '#649400',
  },
  {
    long: 'DATA_DEFICIENT',
    short: 'DD',
    description: 'Data Deficient',
    color: '#CCCCCC',
  },
  {
    long: 'NOT_EVALUATED',
    short: 'NE',
    description: 'Not Evaluated',
    color: '#FFFFFF',
  },
]
// --- Computed Properties ---

// Find the status object from STATUS_MAP
const statusData = computed(() => {
  if (!status.value) return null
  return STATUS_MAP.find((item) => item.short === status.value) || null
})

// Get the full status description for display
const fullStatus = computed(() => {
  return statusData.value?.description || 'Unknown'
})

// Generates the image path based on the status code
const statusImagePath = computed(() => {
  if (!status.value) return ''
  // Use square icon format (e.g., EX_IUCN_3_1.svg) or status scale format (Status_iucn3.1_LC.svg)
  if (props.icon || status.value === 'NE' || status.value === 'DD') {
    return `./assets/IUCN3.1/${status.value}_IUCN_3_1.svg`
  }
  return `./assets/IUCN3.1/Status_iucn3.1_${status.value}.svg`
})

// --- API Logic ---

/**
 * Main function to execute the two-step API call.
 */
async function loadStatus() {
  if (!props.binomial) return

  isLoading.value = true
  status.value = null // Reset status

  // 1. Get the Taxon Key
  const key = await getTaxonKey(props.binomial)

  if (key) {
    // 2. Fetch the IUCN Status
    status.value = await getIucnStatus(key)
  } else {
    console.warn(`Could not find a reliable GBIF match for: ${props.binomial}`)
  }

  isLoading.value = false
}

// --- Lifecycle and Watchers ---

// Load status when the component mounts
onMounted(loadStatus)

// Reload status if the binomial name prop changes
watch(() => props.binomial, loadStatus)
</script>

<style scoped>
/* Scoped styles for the component */
.iucn-status-container {
  display: flex;
  align-items: center;
  padding: 4px 0;
  border-radius: 4px;
  font-family: Arial, sans-serif;
}
.iucn-status-container.iucn-scale {
  border-top: 1px solid #ccc;
}
.iucn-scale .iucn-status-image {
  /* width: 48px; /* Standard size for IUCN icons  */
  height: 48px;
  margin: auto;
  max-width: fit-content;
}

/* Icon mode: smaller square icon */
.iucn-icon .iucn-status-image {
  width: 2em;
  height: 2em;
}

.iucn-status-text {
  font-weight: bold;
  font-size: 0.9em;
  color: #333;
}

.iucn-loading,
.iucn-error {
  padding: 8px;
  font-style: italic;
  color: #666;
}
</style>
