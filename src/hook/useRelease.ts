import axios from 'axios'

interface HookParams {
  page: number
  url: string
}

const generateReleaseList = (html: string) => {
  const host = document.createElement('div')
  const shadowRoot = host.attachShadow({ mode: 'closed' })
  shadowRoot.innerHTML = html
  const list = shadowRoot.querySelectorAll('.Box-body')
  return Array.from(list).map((node) => {
    const version = node.querySelector('.Link--primary.Link')?.textContent ?? ''
    const content = node.querySelector('.markdown-body')?.innerHTML
    return {
      version,
      content,
    }
  })
}

export const useRelease = (opts: HookParams) => {
  const { page = 1, url } = opts

  const pageRef = ref(page)
  const pageUrlRef = ref(url)
  const loading = ref(false)
  const list = ref<any>(null)

  const wholeReleaseUrl = computed(
    () => `${pageUrlRef.value}/releases?expanded=true&page=${pageRef.value}`,
  )

  const fetch = async () => {
    loading.value = true
    console.log('=====fetch the page======')
    const { data } = await axios.get(unref(wholeReleaseUrl))
    console.log('=====fetch the page end======')
    const value = generateReleaseList(data)
    list.value = value
    loading.value = false
  }

  watch(wholeReleaseUrl, () => fetch())

  return {
    url: pageUrlRef,
    page: pageRef,
    list,
    loading,
  }
}
