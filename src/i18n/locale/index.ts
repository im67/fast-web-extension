import { CommonNS } from '@/typings/common'
import { releaseCN, releaseEN } from './release'

export default {
  [CommonNS.Language.ZH]: {
    ...releaseCN,
  },
  [CommonNS.Language.EN]: {
    ...releaseEN,
  },
}
