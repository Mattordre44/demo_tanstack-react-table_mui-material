import { faker } from "@faker-js/faker";
import { User } from "../model/user";

const newUser = (): User => {
    return {
        id: faker.string.uuid(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        age: faker.number.int(80),
        username: faker.internet.userName(),
        isAdmin: faker.datatype.boolean(0.2),
        mail: faker.internet.email(),
    };
};

export function makeDataUser(nb: number): User[] {
    const users: User[] = [];
    for (let i = 0; i < nb; i++) {
        users.push(newUser());
    }
    return users;
}