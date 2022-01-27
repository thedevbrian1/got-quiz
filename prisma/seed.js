import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getUsers().map(user => {
            return db.user.create({ data: user });
        })
    );
}

seed();

function getUsers() {
    return [
        {
            email: "johndoe@gmail.com",
            password: "johndoepassword"
        },
        {
            email: "janedoe@gmail.com",
            password: "janedoepassword"
        },
        {
            email: "jindoe@gmail.com",
            password: "jindoepassword"
        },
        {
            email: "chucknorris@gmail.com",
            password: "dont need a password"
        }
    ];
}