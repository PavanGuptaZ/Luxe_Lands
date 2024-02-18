
export default interface UserType {
    _id: string,
    name: string,
    email: string,
    age: number,
    country: string
    createdAt: string,
    updatedAt: string,
    address: string,
    __v: number,
    token: string,
    password?: string
}