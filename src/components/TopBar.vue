<template>
  <header class="topbar">
    <div class="topbar-container">
      <router-link to="/" class="topbar-title">
        <h1>{{ $t('gardenSpecies') }}</h1>
      </router-link>

      <div class="topbar-actions">
        <UsernameInput />
        <SelectLanguage />

        <router-link to="/settings" class="settings-button" :title="$t('settings')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            class="settings-icon"
          >
            <g v-html="cdxIconSettings"></g>
          </svg>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import SelectLanguage from './SelectLanguage.vue'
import UsernameInput from './UsernameInput.vue'
import { cdxIconSettings } from '@wikimedia/codex-icons'
</script>

<style scoped>
.topbar {
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.topbar-title {
  text-decoration: none;
  color: white;
}

.topbar-title h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  transition: opacity 0.2s;
}

.topbar-title:hover h1 {
  opacity: 0.8;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.settings-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: background-color 0.2s;
  color: white;
  text-decoration: none;
}

.settings-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.settings-icon {
  fill: currentColor;
}

.topbar .has-username {
  text-align: right;
  font-weight: 900;
}

@media (max-width: 768px) {
  .topbar-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .topbar-title h1 {
    font-size: 1.25rem;
  }
}
</style>
