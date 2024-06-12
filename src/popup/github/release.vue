<template>
  <div
    class="h-full w-full"
    v-if="isNpmjsVersionPage"
    v-loading="loading"
    element-loading-text="加载中, 请稍后, 这和您访问github网站的速度有关"
  >
    <div v-for="item of list" class="mx-2 my-3">
      <el-card :title="item.version">
        <template #header>
          <h3 class="text-xl font-bold">{{ item.version }}</h3>
        </template>
        <template #default>
          <div v-html="item.content"></div>
        </template>
      </el-card>
    </div>
  </div>
  <view v-else> </view>
</template>

<script setup lang="ts">
import { NpmWebsiteNS } from '@/typings/npmjs'
import { getCurrentActiveTab } from '@/utils/tab'
import { useRelease } from '@/hook/useRelease'

const isNpmjsVersionPage = ref(false)

const githubUrl = ref('')

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
  const { url = '', id = -1 } = await getCurrentActiveTab()
  if (NpmWebsiteNS.VERSION_URL_REGEXP.test(url)) {
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

watch(githubUrl, (n) => {
  url.value = n
})

const { page, url, list, loading } = useRelease({ url: githubUrl.value, page: 1 })
</script>

<style lang="scss">
@import '@/styles/markdown.scss';
</style>
