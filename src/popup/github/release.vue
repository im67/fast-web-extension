<template>
  <div v-if="isNpmjsVersionPage">This is NPMJS</div>
  <view v-else>No NPMJS</view>
</template>

<script setup lang="ts">
import { NpmWebsiteNS } from '@/typings/npmjs'
import { getCurrentActiveTab } from '@/utils/tab'

const isNpmjsVersionPage = ref(false)

onMounted(async () => {
  const { url } = await getCurrentActiveTab()
  if (url === NpmWebsiteNS.VERSION_URL) {
    isNpmjsVersionPage.value = true
    // get the Github url
    chrome.scripting.
  }
})
</script>
