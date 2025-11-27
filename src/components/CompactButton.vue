<template>
  <button
    @click="toggleCompactView"
    class="compact-button"
    :title="isCompact ? $t('view-compact') : $t('view-expand')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="compact-icon"
    >
      <rect v-if="isCompact" x="3" y="3" width="7" height="7" />
      <rect v-if="isCompact" x="14" y="3" width="7" height="7" />
      <rect v-if="isCompact" x="3" y="14" width="7" height="7" />
      <rect v-if="isCompact" x="14" y="14" width="7" height="7" />

      <rect v-if="!isCompact" x="2" y="2" width="20" height="7" />
      <rect v-if="!isCompact" x="2" y="14" width="20" height="7" />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

const isCompact = computed(() => settings.compactView)

function toggleCompactView() {
  settings.toggleCompactView()
}
</script>

<style scoped>
.compact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}
.compact-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.compact-icon {
  fill: currentColor;
}
@media (max-width: 480px) {
  .compact-button {
    padding: 0.4rem;
  }
  .compact-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
