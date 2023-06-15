interface User {
    id?: string;
    name: string;
    email: string;
    weight: number;
    height: number;
    password: string;
    _doc?: Object
}

export default User;