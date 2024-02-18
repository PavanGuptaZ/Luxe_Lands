import { PropertyType } from "../../interfaces/api/propertyFace"

export default async function getPropertyByIdApiFunction(id: string, accessToken: string | boolean)
    : Promise<{ status: "error", message: string } | { status: "ok", property: PropertyType }> {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/property/propertyBy/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Bearer ${accessToken || ""}`
            },
            credentials: "include",
        })

        const dataRecieved = await responce.json()
        return dataRecieved as { status: "ok", property: PropertyType } | { status: 'error', message: string }
    } catch (error) {
        return { status: 'error', message: "Fetching error" }
    }
}
