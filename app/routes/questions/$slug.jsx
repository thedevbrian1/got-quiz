export function loader({ params }) {
    console.log(params.slug);
    return null;
}

export default function Question() {
    return <h1 className="text-4xl font-bold">This is a single question</h1>
}