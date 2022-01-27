import { useLoaderData } from "remix";

// export async function loader() {
//     const response = await fetch("https://n2tvwman.api.sanity.io/v1/data/query/production?query=*%5B_type%20%3D%3D%20'user'%5D%7Bemail%7D");
//     const registeredUsers = await response.json();
//     // console.log(registeredUsers.result);
//     return registeredUsers.result;
// }
export default function Index() {
    // const data = useLoaderData();
    // console.log(data);
    return (
        <div>
            <h1 className="text-4xl font-bold">Index Page</h1>
        </div>
    )
}