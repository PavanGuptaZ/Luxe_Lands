export default async function getPropertiesListApiFunction(page: number, accessToken: string | boolean) {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/property/page/" + page, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Bearer ${accessToken || ""}`
            },
            credentials: "include",
        })

        const dataRecieved = await responce.json()
        return dataRecieved
    } catch (error) {
        return { status: 'error', message: "Fetching error" }
    }
}
