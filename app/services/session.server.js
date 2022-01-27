import { createCookieSessionStorage } from "remix";

export let sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_gotsession",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: ["cookieSecret"],
        secure: process.env.NODE_ENV === "production",
    },
});

export let { getSession, commitSession, destroySession } = sessionStorage;