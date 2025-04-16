import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast, POSITION } from 'vue-toastification'
import router from '@/router'

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

export const useUserStore = defineStore('user', {
  state: getInitialState,
  actions: {
    setUser(user: {id: string, title?: string, firstName: string, lastName: string}) {
      this.userId = user.id
      this.title = user.title || undefined
      this.firstName = user.firstName
      this.lastName = user.lastName
    },
    resetUser() {
      this.userId = undefined
      this.title = undefined
      this.firstName = undefined
      this.lastName = undefined
    },
    async login(username: string, password: string): Promise<void> {
      if (username.trim() === '' || password.trim() === '') {
        toast.error('Invalid username or password', { position: POSITION.TOP_CENTER })
      } else {
        await axios
          .post(`/api/auth/login`, {
            username,
            password,
          })
          .then((response) => {
            if (response.status === 200) {
              router.push({ name: 'home' })
            } else {
              toast.error(response.data.message, { position: POSITION.TOP_CENTER })
            }
          })
          .catch((error) => {
            toast.error(error.response.data?.message, { position: POSITION.TOP_CENTER })
          })
      }
    },
    async setActiveUser() {
      await axios
        .get('/api/auth/user')
        .then((response) => {
          if (response.status !== 200) {
            toast('Please log in to continue', {position: POSITION.TOP_CENTER, timeout: 2000})
            this.resetUser()
            router.push({ name: 'login' })
          } else {
            this.setUser(response.data.user)
            router.push({ name: 'home' })
          }
        })
        .catch(() => {
          toast('Please log in to continue', {position: POSITION.TOP_CENTER, timeout: 2000})
          this.resetUser()
          router.push({ name: 'login' })
        })
    },
    async logout() {
      await axios.get('/api/auth/logout')
      .then((response) => {
        if (response.status !== 204) {
          toast.error('Something went wrong!', {position: POSITION.TOP_CENTER, timeout: 2000})
        } else {
          this.resetUser()
          router.push({ name: 'login' })
        }
      })
      .catch(() => {
        toast.error('Something went wrong!', {position: POSITION.TOP_CENTER, timeout: 2000})
      })
    }
  },
})
