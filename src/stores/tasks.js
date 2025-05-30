import {defineStore} from "pinia"
import {ref} from "vue"
import {getDatabase, onValue, ref as dbRef, orderByChild, query, set, remove, update} from "firebase/database";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const useTasksStore = defineStore('tasksStore', () => {
    const tasks = ref({
        todo: [],
        inProgress: [],
        done: []
    })
    const db = getDatabase();
    const auth = getAuth();
    const loader = ref(true)
    const getTasks = () => {
        loader.value = true
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const starCountRef = dbRef(db, `users/${auth.currentUser.uid}/tasks`);
                onValue(starCountRef, (snapshot) => {
                    if(!snapshot.val()) {
                        set(dbRef(db, 'users/' + auth.currentUser.uid + '/tasks'), {
                            todo: [],
                            inProgress: [],
                            done: []
                        }).then(() => console.log('Добавлено')).catch((error) => console.log(error));
                    } else {
                        tasks.value.todo = snapshot.val().todo ? snapshot.val().todo : []
                        tasks.value.inProgress = snapshot.val().inProgress ? snapshot.val().inProgress : []
                        tasks.value.done = snapshot.val().done ? snapshot.val().done : []
                    }
                    console.log(tasks.value)
                    loader.value = false
                }, (error) => {
                    console.log(error);
                });
            } else {
                console.log("User logged out")
            }
        })
    }
    const addTask = (task) => {
        loader.value = true
        update(dbRef(db, 'users/' + auth.currentUser.uid + '/tasks'), {
            todo: [...tasks.value.todo, task]
        }).then(() => console.log('Добавлено')).catch((error) => console.log(error));
    }
    const setTasks = (tasks) => {
        update(dbRef(db, 'users/' + auth.currentUser.uid + '/tasks'), {
            todo: tasks.todo,
            done: tasks.done,
            inProgress: tasks.inProgress
        }).then(() => console.log('Добавлено')).catch((error) => console.log(error));
    }
    const removeTask = (index) => {
        tasks.value.done.splice(index, 1)
        update(dbRef(db, 'users/' + auth.currentUser.uid + '/tasks'), {
            done: tasks.value.done
        }).then(() => console.log('Добавлено')).catch((error) => console.log(error));
    }
    return {tasks, getTasks, addTask, removeTask, loader, setTasks}
})
