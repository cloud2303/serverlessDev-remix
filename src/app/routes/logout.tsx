import { ActionFunction, LoaderFunction, redirect } from "remix";
import { destroySession, getSession } from "~/services/session.server";

export let action: ActionFunction = async ({ request }) => {
  
  console.log(request)
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(await getSession(request.headers.get("Cookie"))),
    },
  });
};

export let loader: LoaderFunction = () => {
  throw new Response("", { status: 404 });
};
