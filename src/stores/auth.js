import {defineStore} from 'pinia'
import {ref} from 'vue'

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'
import {getToken, onMessage} from "firebase/messaging";
import {getMessaging} from "firebase/messaging/sw";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const error = ref('')
    const router = useRouter()
    const loader = ref(false)

    const accessToken = ref('')
    const refreshToken = ref('')
    const notificationToken = ref('');

    const userInfo = ref({
        email: '',
        userId: '',
        name: ''
    })
    const auth = async (type, payload) => {
        const firebaseAuth = getAuth()
        switch (type) {
            case 'logout':
                signOut(firebaseAuth)
                    .then(() => {
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('user')
                        accessToken.value = ''
                        refreshToken.value = ''
                        userInfo.value = {
                            email: '',
                            userId: '',
                            name: ''
                        }
                        router.push('/login')
                        /*console.log("Logout OK")*/
                    })
                    .catch((e) => console.log(e))
                break

            case 'login':
                loader.value = true
                try {
                    const {user} = await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
                    if (user) {
                        accessToken.value = user.accessToken
                        refreshToken.value = user.refreshToken
                        localStorage.setItem('accessToken', user.accessToken)
                        localStorage.setItem('refreshToken', user.refreshToken)
                        setUser(firebaseAuth.currentUser)
                    }
                } catch (e) {
                    showError(e.code)
                } finally {
                    loader.value = false
                }
                break
            case 'registration':
                try {
                    const {user} = await createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
                    if (user) {
                        accessToken.value = user.accessToken
                        refreshToken.value = user.refreshToken
                        localStorage.setItem('accessToken', user.accessToken)
                        localStorage.setItem('refreshToken', user.refreshToken)
                        await updateProfile(firebaseAuth.currentUser, {displayName: payload.displayName})
                        setUser(firebaseAuth.currentUser)
                    }

                } catch (e) {
                    showError(e.code)
                } finally {
                    loader.value = false
                }
                break
            default:
                throw new Error('Такого типа авторизации не существует')
        }

    }

    const updateUser = async (newName) => {
        loader.value = true
        const firebaseAuth = getAuth()
        console.log(newName)
        await updateProfile(firebaseAuth.currentUser, {displayName: newName}).then(
            () => {
                console.log('User name updated successfully')
                userInfo.value.name = newName
                localStorage.setItem('user', JSON.stringify(userInfo.value))
            },
            (error) => {
                console.log(error)
            }
        )
        loader.value = false
    }

    const setUser = (data) => {
        userInfo.value = {
            email: data.email,
            name: data.displayName,
            userId: data.uid
        }
        localStorage.setItem('user', JSON.stringify(userInfo.value))
    }
    const showError = (e) => {
        console.log(e)
        switch (e) {
            case 'auth/email-already-in-use':
                error.value = 'Такой email уже зарегистрирован'
                break
            case 'auth/weak-password':
                error.value = 'Слишком слабый пароль, минимум 6 символов'
                break
            case 'auth/operation-not-allowed':
                error.value = 'Регистрация недоступна'
                break
            case 'auth/too-many-requests':
                error.value = 'Слишком много попыток входа. Попробуйте позже'
                break
            case 'auth/user-not-found':
                error.value = 'Такой пользователь не найден'
                break
            case  'auth/wrong-password':
                error.value = 'Неверный логин или пароль'
                break
            case  'auth/invalid-credential':
                error.value = 'Неверный логин или пароль'
                break
            case 'auth/user-disabled':
                error.value = 'Учетная запись неактивна'
                break
            default:
                error.value = 'Что-то пошло не так'
                break
        }
        throw error.value
    }
    const getTokenNotification = () => {
        const localToken = localStorage.getItem('notificationToken')
        const messaging = getMessaging();

        getToken(messaging, {vapidKey: 'BPLWoA5EryQNWtQIwl6EnJjvpufIc4h2QlIc6YuvB3TGmwB-whOjddQLHS9afM6-0J62JvQQ8U7KkdE6PUATyBk'}).then((currentToken) => {
            if (currentToken !== localToken) {
                notificationToken.value = currentToken
                localStorage.setItem('notificationToken', currentToken)

            } else {
                notificationToken.value = localToken
                console.log('Token is not changed');
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            notificationToken.value = ''
            localStorage.removeItem('notificationToken')
        });

        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
        });
    }

    return {
        auth,
        userInfo,
        accessToken,
        refreshToken,
        updateUser,
        error,
        loader,
        notificationToken,
        getTokenNotification
    }
})
