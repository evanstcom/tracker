import {defineStore} from "pinia"
import {ref} from "vue"
import {getDatabase, onValue, ref as dbRef, set} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import axios from "axios";


export const usePremiersStore = defineStore('premiersStore', () => {
    const premiers = ref([])
    const top250 = ref([])
    const topOnMain = ref([])
    const currentPage = ref(1)
    const auth = getAuth();
    const db = getDatabase();
    const loader = ref(true)
    const apiKey = import.meta.env.VITE_API_KEY_FILMS

    const month = {
        0: 'january',
        1: 'february',
        2: 'march',
        3: 'april',
        4: 'may',
        5: 'june',
        6: 'july',
        7: 'august',
        8: 'september',
        9: 'october',
        10: 'november',
        11: 'december'
    }
    const date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    }

    const getPremiers = async () => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `premiers/${date.year}/${month[date.month]}`);
                onValue(starCountRef, (snapshot) => {
                    if (!snapshot.val()) {
                        getMonthlyFilms()
                    }
                    premiers.value = snapshot.val().items
                    loader.value = false
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
    }

    const getMonthlyFilms = async () => {
        const {data} = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${date.year}&month=${month[date.month]}`
            , {
                headers: {
                    "X-API-KEY": apiKey,
                    "Content-Type": "application/json",
                },
            })
        set(dbRef(db, `premiers/${date.year}/${month[date.month]}`), {
            items: data.items
        }).then(() => console.log('Добавлено')).catch((error) => console.log(error))
    }

    const getTop250 = (page) => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `top/${page}`);
                onValue(starCountRef, (snapshot) => {
                    top250.value = snapshot.val()
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
    const getTopOnMain = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `top/1`);
                onValue(starCountRef, (snapshot) => {
                    topOnMain.value = snapshot.val()
                    loader.value = false
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
    }

    return {premiers, getPremiers, getTop250, top250, getTopOnMain, topOnMain, currentPage, loader}
})