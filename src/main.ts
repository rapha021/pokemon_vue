import { createApp } from "vue"
import { createPinia } from "pinia"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

const options = {
  timeout: 2000,
}

app.use(Toast, options)

app.use(createPinia())
app.use(router)

app.mount("#app")
