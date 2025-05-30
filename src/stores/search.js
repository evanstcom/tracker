import {defineStore} from "pinia"
import {ref} from "vue"
import {getDatabase, onValue, ref as dbRef, orderByChild, query, set, remove} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const useSearchStore = defineStore('searchStore', () => {
    const lastSearch = ref([])
    const memory = ref('')
    const memoryFilms = ref([])
    const db = getDatabase();
    const auth = getAuth();

    const loader = ref(true)
    const getLastSearch = () => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = query(dbRef(db, `users/${user.uid}/search`), orderByChild('date'));
                onValue(starCountRef, (snapshot) => {
                    const favItems = []
                    snapshot.forEach((childSnapshot) => {
                        favItems.push(childSnapshot.val())
                    })
                    lastSearch.value = favItems.reverse()
                    loader.value = false
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
    }
    const addToLastSearch = (item, id) => {
        const date = new Date().getTime()
        item.isFavorite = true
        set(dbRef(db, 'users/' + auth.currentUser.uid + '/search/' + id), {
            nameRu: item.nameRu ? item.nameRu : item.nameEn,
            year: item.year,
            rating: item.rating,
            posterUrl: item.posterUrl,
            id: +id,
            date: date
        }).then(() => console.log('Добавлено')).catch((error) => console.log(error));
    }
    const removeFromSearch = (id) => {
        remove(dbRef(db, 'users/' + auth.currentUser.uid + '/search/' + id)).then(() =>
            console.log('Удалено')
        ).catch((error) => console.log(error));
    }
    const removeAllSearch = () => {
        remove(dbRef(db, 'users/' + auth.currentUser.uid + '/search/')).then(() =>
            console.log('Удалено все')
        ).catch((error) => console.log(error));
    }
    return {memory, memoryFilms, lastSearch, loader, getLastSearch, addToLastSearch, removeFromSearch, removeAllSearch}
})
