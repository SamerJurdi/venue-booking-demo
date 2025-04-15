import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast, POSITION } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()

const getInitialState = (): {
  userId: string | undefined
  title: string | undefined
  firstName: string | undefined
  lastName: string | undefined
} => {
  return {
    userId: undefined,
    title: undefined,
    firstName: undefined,
    lastName: undefined,
  }
}

export const useUserStore = defineStore('booking', {
  state: getInitialState,
  actions: {
    setUser(user: {id: string, title?: string, firstName: string, lastName: string}) {
      this.userId = user.id
      this.title = user.title || undefined
      this.firstName = user.firstName
      this.lastName = user.lastName
    },
    async login(username: string, password: string): Promise<void> {
      const router = useRouter()

      if (username.trim() === '' || password.trim() === '') {
        toast.error('Invalid username or password', { position: POSITION.TOP_CENTER })
      } else {
        await axios
          .post(`/api/auth/login`, {
            username,
            password,
          })
          .then(function (response) {
            if (response.status === 200) {
              router.push({ name: 'home' })
            } else {
              toast.error(response.data.message, { position: POSITION.TOP_CENTER })
            }
          })
          .catch(function (error) {
            toast.error(error.response.data.message, { position: POSITION.TOP_CENTER })
          })
      }
    },
    async setActiveUser() {
      const router = useRouter()
      const setUser = this.setUser

      await axios
        .get('/api/auth/user')
        .then(function (response) {
          if (response.status !== 200) {
            toast('Please log in to continue', {position: POSITION.TOP_CENTER, timeout: 2000})
            router.push({ name: 'login' })
          } else {
            setUser(response.data)}
        })
        .catch(function () {
          toast('Please log in to continue', {position: POSITION.TOP_CENTER, timeout: 2000})
          router.push({ name: 'login' })
        })
    }
  },
})
