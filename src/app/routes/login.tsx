import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
} from "remix";
import { AuthorizationError } from "remix-auth";
import { authenticator } from "~/services/auth.server";

export let action: ActionFunction = async ({ request }) => {
  // try{
  //   return await authenticator.authenticate("user-pass", request, {
  //     successRedirect: "/",
  //     failureRedirect:"/login"
  //   });
  // }catch(error){
  //   console.log(11111111,error)
  //   if (error instanceof Response) return redirect("/login");
  //   if (error instanceof AuthorizationError) {
  //     // here the error is related to the authentication process
  //     return {message:"密码abc123都告诉你了还整不对，太行了～"};
  //   }

  // }
  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      throwOnError: true,
    });
  } catch (error) {
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return { message: "密码abc123都告诉你了还整不对，太行了～" };
      // here the error is related to the authentication process
    }

    // here the error is a generic error that another reason may throw
  }
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  if (user) return redirect("/");

  return {};
};

export default function Login() {
  const message = useActionData<{ message: string }>();

  return (

      <Form method="post">
        <div>
          <label>邮箱</label>
          <input
            type="email"
            name="email"
            required
            defaultValue="user@example.com"
          />
        </div>
        <div>
          <label>密码</label>
          <input
            type="password"
            name="password"
            required
            defaultValue="abc123"
          />
        </div>
        <button>登录</button>
        <div>
          {message ? (
            <div style={{ color: "red" }}>
              人与人之间的信任呢，都告诉你是abc123了
            </div>
          ) : (
            "密码是abc123,直接登录就好了~"
          )}
        </div>
      </Form>
  );
}
