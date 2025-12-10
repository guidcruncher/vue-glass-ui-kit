// main.js

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import UiPage from './pages/UiPage.vue'

import { UseGlassUi } from './components/'

// Define the YAML content (copied from section 1)
import { EXAMPLE_YML_DEFINITION } from './demo/menu'

const app = createApp(App)
UseGlassUi(app)
app.provide('desktopYaml', EXAMPLE_YML_DEFINITION)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/ui',
    name: 'Ui',
    component: UiPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
