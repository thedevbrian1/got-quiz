import { useLoaderData, Form, useTransition, useActionData, redirect, Outlet } from "remix";
import { getClient } from "../lib/sanity/getClient";
import badRequest from "~/utils/badRequest";
import { getUserSession, storage } from "~/utils/session.server";

function validateUserChoice(choice) {
    if (choice === null) {
        return 'Select an answer to continue';
    }
}

// export async function loader({ request }) {
//     // Read difficulty level from the session and query for the appropriate questions
//     // const session = await storage.getSession();
//     const session = await getUserSession(request);
//     const sessionDifficulty = session.get('difficulty');

//     // console.log('Session difficulty', sessionDifficulty);
//     console.log('Difficulty', sessionDifficulty);

//     let difficulty = (sessionDifficulty === 'Easy') 
//         ? process.env.SANITY_DIFFICULTY_EASY 
//         : (sessionDifficulty === 'Intermediate')
//         ? process.env.SANITY_DIFFICULTY_INTERMEDIATE
//         : (sessionDifficulty === 'Legendary')
//         ? process.env.SANITY_DIFFICULTY_LEGENDARY
//         : null;

//     // if (sessionDifficulty === 'Easy') {
//     //     difficulty = process.env.SANITY_DIFFICULTY_EASY;
//     // } else if (sessionDifficulty === 'Intermediate') {
//     //     difficulty = process.env.SANITY_DIFFICULTY_INTERMEDIATE;
//     // } else if (sessionDifficulty === 'Legendary') {
//     //     difficulty = process.env.SANITY_DIFFICULTY_LEGENDARY;
//     // }

//     console.log('Chosen difficulty:', difficulty);

//    const questions = await getClient().fetch(`*[_type == "question" && references('${difficulty}')]{ difficulty->{title}, body[0]{children[0]{text}}, choices}`);
  
//    console.log('Questions: ', questions);

//   return { questions };
  
// }

// export async function action({ request }) {
//     const { answer } = await getClient().fetch(`*[_type == "question" && references('3cc7636f-6173-4b16-9414-8ebf4993101e')]{answer}[0]`);
//     const formData = await request.formData();
//     const userChoice = formData.get('choice');
    
//     // console.log(userChoice === answer);
    
//     const userChoiceFieldError = {
//         name: validateUserChoice(userChoice)
//     };
//     // return bad request if the user did not select anything
//     if (Object.values(userChoiceFieldError).some(Boolean)) {
//         return badRequest({ userChoiceFieldError });
//     }
//     if (userChoice !== answer) {
//         return redirect('/wrong');
//     }
    
//     return redirect('/success');
    
// }

export default function Questions() {
    // const { questions } = useLoaderData();
    // const transition = useTransition();
    // const actionData = useActionData();

    // console.log(actionData);

    return (
        <Outlet />
        // <div>
        //     <h1>Questions</h1>
        //     {questions.map((question, index) => (
        //         <div key={index}>
        //             <p className="text-3xl">
        //                 {question.body.children.text}
        //             </p>
        //             <Form method="post" className="flex flex-col mt-2">
        //                 <div className="mt-5">
        //                     {question.choices.map((choice, index) => (
        //                         <div key={index}>
        //                             <input type="radio" name="choice" value={choice} id={index} /> {" "}
        //                             <label htmlFor={index} className="ml-2 text-lg">{choice}</label>
        //                         </div>
        //                     ))}
        //                     {actionData?.userChoiceFieldError?.name
        //                         ? (<span className="text-red-500">
        //                             {actionData.userChoiceFieldError.name}
        //                         </span>)
        //                         : null
        //                     }
        //                 </div>
        //                 <button
        //                     type="submit"
        //                     className="w-24 h-10 bg-black text-white rounded mt-4"
        //                 >
        //                     {transition.state === "submitting"
        //                         ? "Submitting.."
        //                         : "Submit"
        //                     }
        //                 </button>
        //             </Form>
        //         </div>
        //     ))}
        // </div>
        
        // <Form method="post" className="flex flex-col mt-16">
        //     <p className="text-3xl">{questions.body.children.text}</p>
        //     <div className="mt-5">
        //         {questions.choices.map((choice, index) => (
        //             <div key={index}>
        //                 <input type="radio" name="choice" value={choice} id={index} />{" "}
        //                 <label htmlFor={index} className="ml-2 text-lg">{choice}</label>
        //             </div>
        //         ))}
        //         {actionData?.userChoiceFieldError?.name 
        //             ? (<span className="text-red-500">
        //                 {actionData.userChoiceFieldError.name}
        //                 </span>)
        //             : null
        //         }
        //     </div>
        //     <button
        //         type="submit"
        //         className="w-24 h-10 bg-black text-white rounded mt-4"
        //     >
        //         {transition.state === "submitting"
        //             ? "Submitting.."
        //             : "Submit"
        //         }
        //     </button>
        // </Form> 
    );
}