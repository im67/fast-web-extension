<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const count = ref(0)
const link = ref('https://github.com/guocaoyi/create-chrome-ext')

const minus = () => {
  if (count.value > 0) count.value--
}
const add = () => count.value++

onMounted(() => {
  chrome.storage.sync.get(['count'], (result) => {
    count.value = result.count ?? 0
  })
})

watch(count, (newCount) => {
  chrome.storage.sync.set({ count: newCount })

  chrome.runtime.sendMessage({ type: 'COUNT', count: count.value })
})
</script>

<template>
  <router-view></router-view>
</template>

<style></style>
