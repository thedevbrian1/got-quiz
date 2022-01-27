import { json, redirect, useActionData } from "remix";

function validateName(name) {
    if (name === null) {
        return 'Name cannot be empty';
    }
}

function validateDescription(description) {
    if (description === null) {
        return 'Description cannot be empty';
    }
}

const badRequest = (data) => json(data, { status: 400 });

export async function action({ request }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const desc = formData.get('description');

    const fields = { name, desc };
    const fieldErrors = {
        name: validateName(name),
        desc: validateDescription(desc)
    };

    if (Object.values(fieldErrors).some(Boolean))
        return badRequest({ fieldErrors, fields });
    
    return redirect(`/projects/${name}`);
}

export default function NewProject() {
    const actionData = useActionData();
    console.log(actionData);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form method="post" action="/projects/new">
                <p>
                    <label>
                        Name: 
                        <br />
                        <input 
                            type="text" 
                            name="name" 
                            className="outline" 
                            defaultValue={actionData?.fields?.name}
                        />
                    </label>
                    {actionData?.fieldErrors?.name ? (<p className="text-red-500">
                        {actionData.fieldErrors.name}
                    </p>) : null}
                </p>
                <p>
                    <label>
                        Description:
                        <br />
                        <textarea
                         name="description" 
                         className="outline"
                         defaultValue={actionData?.fields?.desc}
                          />
                    </label>
                    {actionData?.fieldErrors?.desc ? (
                        <p className="text-red-500">{actionData?.fieldErrors?.desc}</p>
                    ) : null}
                </p>
                <p className="mt-4">
                    <button type="submit" className="bg-blue-500  text-white">Create</button>
                </p>
            </form>
        </div>
        
    )
}

export function ErrorBoundary({ error }) {
    return (
        <div>
            <h1>Error</h1>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
        </div>
    )
}