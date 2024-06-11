<template>
  <iframe
    :srcdoc="releasePageDoc"
    v-if="isNpmjsVersionPage"
    style="border: none; width: 100%; height: 100%"
  ></iframe>
  <view v-else>No NPMJS</view>
</template>

<script setup lang="ts">
import { NpmWebsiteNS } from '@/typings/npmjs'
import { getCurrentActiveTab } from '@/utils/tab'
import axios from 'axios'

const isNpmjsVersionPage = ref(false)

const githubUrl = ref('')

const releasePageDoc = ref('')

const RELEASE_CODE = 'release'

const getGithubUrlFunction = async () => {
  const RELEASE_CODE = 'release'
  const aEl: HTMLAnchorElement | null = document.querySelector(
    "a[aria-labelledby='repository repository-link']",
  )
  if (aEl) {
    const url = aEl.href
    await chrome.runtime.sendMessage({ code: RELEASE_CODE, data: { url } })
  }
}

onMounted(async () => {
  const { url, id = -1 } = await getCurrentActiveTab()
  if (url === NpmWebsiteNS.VERSION_URL) {
    isNpmjsVersionPage.value = true

    chrome.runtime.onMessage.addListener((request) => {
      const {
        code,
        data: { url },
      } = request
      if (code === RELEASE_CODE) {
        githubUrl.value = url
      }
    })
    // get the Github url
    chrome.scripting.executeScript({
      target: { tabId: id },
      func: getGithubUrlFunction,
    })
  }
})

const wholeReleaseUrl = computed(() => githubUrl.value + '/releases')

watch(wholeReleaseUrl, async (n) => {
  if (n) {
    const { data } = await axios.get(unref(wholeReleaseUrl))
    releasePageDoc.value = data
  }
})
</script>
