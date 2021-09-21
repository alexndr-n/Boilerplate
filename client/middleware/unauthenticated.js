export default function ({ store, redirect }) {
    if (store.state.auth.user) {
        console.log("redirecting")
        return redirect('/')
    }
}