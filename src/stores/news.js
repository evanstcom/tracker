import {defineStore} from "pinia"
import {ref} from "vue"
import {getDatabase, onValue, ref as dbRef} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";


export const useNewsStore = defineStore('newsStore', () => {
    const newsData = ref([])
    const newsOnMain = ref([])
    const loader = ref(true)
    const currentPage = ref(1)

    const auth = getAuth();
    const db = getDatabase();
    /*    const currentPage = ref(localStorage.getItem('currentPage') ? +localStorage.getItem('currentPage') : 1)
        const apiKey = import.meta.env.VITE_API_KEY_FILMS
        const getNews = async () => {
            const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=${currentPage.value}`, {
                headers: {
                    "X-API-KEY": "5bbbb2f9-a17d-4a30-8adb-16ba0227339b",
                    "Content-Type": "application/json",
                },
            })
            if (data.totalPages !== currentPage.value) {
                currentPage.value = data.totalPages
                localStorage.setItem('currentPage', currentPage.value)
                await getLastNews()
            } else {
                newsData.value = data.items
            }

        }

        const getLastNews = async () => {
            const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=${currentPage.value}`, {
                headers: {
                    "X-API-KEY": apiKey,
                    "Content-Type": "application/json",
                },
            })
            newsData.value = data.items
        }*/
    const getNews = async (page) => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `news/${page}`);
                onValue(starCountRef, (snapshot) => {
                    newsData.value = snapshot.val()
                    loader.value = false
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
        currentPage.value = page
    }

    const getLastNews = async () => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `news/1`);
                onValue(starCountRef, (snapshot) => {
                    newsOnMain.value = snapshot.val()
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
        loader.value = false
    }

    return {newsData, getNews, getLastNews, newsOnMain, currentPage, loader}
})