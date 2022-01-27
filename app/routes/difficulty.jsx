//import { useState, useEffect } from "react";
import { Form, redirect, useLoaderData, useTransition, useActionData, Link } from "remix";
import { getClient } from "../lib/sanity/getClient";
import logo from "../../public/game-of-thrones-logo.svg";
import badRequest from "~/utils/badRequest";
import { getUser, addItemToStorage, getUserSession, storage } from "~/utils/session.server";

//----------------------------------------------------------------------------------------

// Experiments TODO
// Remove <Scripts /> and check if website works
// Use Remix action to submit difficulty and fetch data according to difficulty level

//---------------------------------------------------------------------------------------

function validateDifficulty(choice) {
  if (choice === null) {
    return 'Select a level to continue';
  }
}

// function badRequest(data) {
//   return json(data, { status: 400 });
// }

export async function loader({ request }) {
  //  const questions = await getClient().fetch(`*[_type == "question" && references('3cc7636f-6173-4b16-9414-8ebf4993101e')]{answer, difficulty->{title}, body[0]{children[0]{text}}, choices}[0]`);
  
  // return { questions };
  const user = await getUser(request);
  console.log('Authenticated user: ',user);
  return user;
  
}

export async function action({ request }) {

  // validation
  const formData = await request.formData();
  const difficulty = formData.get('difficulty');
  const difficultyFieldError = {
    name: validateDifficulty(difficulty)
  };

  if (Object.values(difficultyFieldError).some(Boolean)) {
    return badRequest({ difficultyFieldError });
  }

  // const session = await getUserSession(request);
  // session.set("difficulty", difficulty);

  // return redirect("/questions", {
  //   headers: {
  //     "Set-Cookie": await storage.commitSession(session)
  //   }
  // });
   return addItemToStorage(request, "difficulty", difficulty);

  // action for submitting answer
  // const questions = await getClient().fetch(`*[_type == "question" && references('3cc7636f-6173-4b16-9414-8ebf4993101e')]{answer, difficulty->{title}, body[0]{children[0]{text}}, choices}[0]`);
  // const formData = await request.formData();
  // const userChoice = await formData.get('choice');

  // console.log(userChoice);

  // if (userChoice === questions.answer) {
  //   return redirect('/success');
  // }
  //return 'ok';

  // let errors = {};
  
  // if (!difficulty) {
  //   // throw an error to the user
  // }
  //return redirect('/questions');
  
}

export default function Difficulty() {
  // const { questions } = useLoaderData();
  // console.log(questions);
  const data = useLoaderData();
  const transition = useTransition();
  const actionData = useActionData();

  // const [difficulty, setDifficulty] = useState(null);

  // function handleDifficulty(event) {
  //   setDifficulty(event.target.value);
  // }

  // // useEffect(() => {
  // //   console.log(difficulty);
  // // }, [difficulty]);

  // console.log(difficulty);
  return (
    <div className=" w-full h-screen flex flex-col items-center ">
      {/* <h1>Game of Thrones Quiz</h1> */}
      {/* {JSON.stringify(questions, null, 2)} */}
      {data ? (
        <div>
          <span>{`Hi ${data.username}`}</span>
          <form method="post" action="/logout">
            <button type="submit" className="w-28 h-10 bg-yellow-500">Logout</button>
          </form>
        </div>
        ) : <Link to="/login">Login</Link>
      }

      <img src={logo} alt="Game of Thrones" width="500" height="250" className="mt-10" />

      <Form method="post" className="flex flex-col mt-5">
        <span className="text-xl">Select difficulty</span>

        <div>
          <input type="radio" name="difficulty" value="Easy" id="easy" defaultChecked/>{" "}
          <label htmlFor="easy" className="ml-2 text-lg">Easy</label>
        </div>
        
        <div>
          <input type="radio" name="difficulty" value="Intermediate" id="intermediate" />{" "}
          <label htmlFor="intermediate" className="ml-2 text-lg">Intermediate</label>
        </div>
        
        <div>
          <input type="radio" name="difficulty" value="Legendary" id="legendary" />{" "}
          <label htmlFor="legendary" className="ml-2 text-lg">Legendary</label>
        </div>
        {actionData?.difficultyFieldError?.name 
          ?(<span className="text-red-500">{actionData.difficultyFieldError.name}</span>) 
          : null}
        <button className="w-24 h-10 bg-black text-white rounded mt-4 uppercase">{transition.state === 'submitting' || transition.state ==='loading' ? 'Loading' : 'Continue'}</button>
      </Form>

      {/* <Form method="post" className="flex flex-col mt-16">
        <p className="text-3xl">{questions.body.children.text}</p>
        <div className="mt-5">
          {questions.choices.map((choice, index) => (
            <div key={index}>
              <input type="radio" name="choice" value={choice} id={index} />{" "}
              <label htmlFor={index} className="ml-2 text-lg">{choice}</label>
            </div>
          ))}
        </div>
        <button 
          type="submit" 
          className="w-24 h-10 bg-black text-white rounded mt-4"
        >
          {transition.state === "submitting" 
            ?"Submitting.."
            : "Submit"
          }
        </button>
      </Form> */}
    </div>
  );
}
