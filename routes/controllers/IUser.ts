export interface Person {
    name: string
    weight: number
    height: number
}

export interface User extends Person {
    id: string
    email: string
    password: string
    _doc?: Object
}