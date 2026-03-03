import { createApp } from 'vue'
import { firebaseError } from './firebase/firebaseConfig'
import App from './App.vue'
import FirebaseError from './components/FirebaseError.vue'
import router from './routes/index.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'

const RootComponent = firebaseError ? FirebaseError : App

const app = createApp(RootComponent)
app.use(router)
app.mount('#app')