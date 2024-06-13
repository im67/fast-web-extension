<template>
  <div
    class="h-full w-full overflow-auto"
    v-if="version && url"
    v-loading.body="loading"
    :element-loading-text="$t('release.tips.loading')"
  >
    <div class="mx-2 my-3">
      <el-card>
        <template #header>
          <h3 class="text-xl font-bold">{{ version }}</h3>
        </template>
        <template #default>
          <div v-html="data.content"></div>
        </template>
      </el-card>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center p-4 text-center">
    <div>
      <el-icon :size="40" class="is-loading" color="#67C23A"><Tools /></el-icon>
    </div>
    <div class="text-base leading-7">{{ $t('release.tips.popup') }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRelease } from '@/hook/useRelease'
import { Tools } from '@element-plus/icons-vue'

const githubUrl = ref('')
const versionRef = ref('')

onMounted(() => {
  const {
    query: { version: gitVersion, url: gitUrl },
  } = useRoute()
  url.value = gitUrl as string
  version.value = gitVersion as string
})

const { version, url, data, loading } = useRelease({
  url: githubUrl.value,
  version: versionRef.value,
})

watch(data, () => {}, {})
</script>

<style lang="scss">
@import '@/styles/markdown.scss';
</style>
