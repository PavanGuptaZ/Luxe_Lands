
export default async function fetchLogout() {

    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/auth/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: "include",
        })
        const dataRevieved = await responce.json()
        return dataRevieved
    } catch (error) {
        console.log(error)
    }
}