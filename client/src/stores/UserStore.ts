import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast, POSITION } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()

const getInitialState = (): {
} => {
  return {
  }
}

export const useUserStore = defineStore('booking', {
  state: getInitialState,
  actions: {
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
    }
  },
})
