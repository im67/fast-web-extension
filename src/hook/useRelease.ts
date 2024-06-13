import axios from 'axios'

interface HookParams {
  version: string
  url: string
}

const generateReleaseList = (html: string) => {
  const host = document.createElement('div')
  const shadowRoot = host.attachShadow({ mode: 'closed' })
  shadowRoot.innerHTML = html
  const cardBodyEl = shadowRoot.querySelector('.Box-body')
  const version = cardBodyEl?.querySelector('.d-flex h1')?.textContent ?? ''
  const content = cardBodyEl?.querySelector('.markdown-body')?.innerHTML
  return {
    version,
    content,
  }
}

export const useRelease = (opts: HookParams) => {
  const { version, url } = opts

  const versionRef = ref(version)
  const pageUrlRef = ref(url)
  const loading = ref(false)
  const dataRef = ref<any>({ content: '' })

  const wholeReleaseUrl = computed(() => `${pageUrlRef.value}/releases/tag/v${versionRef.value}`)

  const fetch = async () => {
    loading.value = true
    console.log('=====fetch the page======')
    const { data } = await axios.get(unref(wholeReleaseUrl))
    console.log('=====fetch the page end======')
    const value = generateReleaseList(data)
    console.log(value)
    dataRef.value = value
    loading.value = false
  }

  watch(wholeReleaseUrl, () => fetch())

  return {
    url: pageUrlRef,
    version: versionRef,
    data: dataRef,
    loading,
  }
}
