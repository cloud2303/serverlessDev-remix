import {
  Form,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from "remix";
import { User } from "~/models/user";
import { authenticator } from "~/services/auth.server";
import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  return { message: "remix太棒啦～ 😎", user };
};

export default function Index() {
  let data = useLoaderData<{ user: User; message: string }>();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Welcome to Remix!</h2>
      <p>
        <a href="https://docs.remix.run">查看remix文档</a> 
      </p>
      <p>从后端传来的消息: {data.message}</p>
      <p>
        <Link to="not-found">404页面</Link> 点这个会让你看到Errorboundary组件处理404
      </p>
      {!data.user && (
        <p>
          <Link to="login">登录</Link> 点这个让你进入登录界面
        </p>
      )}
      {data.user && (
        <Form action="/logout" method="post">
          <button>登出</button>
        </Form>
      )}
    </div>
  );
}
