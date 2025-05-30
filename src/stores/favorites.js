import {defineStore} from "pinia"
import {ref} from "vue"
import {getDatabase, onValue, ref as dbRef, orderByChild, query, set, remove} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const useFavoritesStore = defineStore('favoritesStore', () => {
    const favorites = ref([])
    const db = getDatabase();
    const auth = getAuth();
    const loader = ref(true)
    const getFavorites = () => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = query(dbRef(db, `users/${user.uid}/favorites`), orderByChild('date'));
                onValue(starCountRef, (snapshot) => {
                    const favItems = []
                    snapshot.forEach((childSnapshot) => {
                        favItems.push(childSnapshot.val())
                    })
                    favorites.value = favItems.reverse()
                    loader.value = false
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
    }
    const addToFavorites = (item, id) => {
        const date = new Date().getTime()
        item.isFavorite = true
        set(dbRef(db, 'users/' + auth.currentUser.uid + '/favorites/' + id), {
            nameRu: item.nameRu ? item.nameRu : item.nameOriginal,
            genres: item.genres,
            year: item.year,
            posterUrl: item.posterUrl,
            id: +id,
            isFavorite: true,
            isWatched: false,
            date: date
        }).then(() => console.log('Добавлено')).catch((error) => console.log(error));
    }
    const removeFromFavorites = (item, id) => {
        if (item) {
            item.isFavorite = false
        }
        remove(dbRef(db, 'users/' + auth.currentUser.uid + '/favorites/' + id)).then(() =>
            console.log('Удалено')
        ).catch((error) => console.log(error));
    }
    return {favorites, getFavorites, addToFavorites, removeFromFavorites, loader}
})
