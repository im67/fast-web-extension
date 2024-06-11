import { createWebHashHistory, createRouter } from "vue-router"
import { RouterNS } from "../typings/route"

const formatPath = (p: RouterNS.RouterName) => {
    return `/${p}`
}

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: formatPath(RouterNS.RouterName.GITHUB_LOG),
            name: RouterNS.RouterName.GITHUB_LOG,
            component: import('../popup/github/release.vue')
        },
        {
            name: 'NotFound',
            path: '/:pathMatch(.*)*',
            redirect: {
                name: RouterNS.RouterName.GITHUB_LOG
            }
          },
    ]
})