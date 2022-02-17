import { useEffect, useRef } from "react";
import { Form, redirect } from "remix";
import { commitSession, getSession } from "~/session.server";

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData();
  const tokenMixture = form.get("access_token")?.toString();

  const match = tokenMixture?.match(
    /#access_token=(?<access_token>[\w\-]{20,60}\.[\w\-]{100,500}\.[\w\-]{20,60})&/);
  if (!match?.groups) {
    console.log("トークンが見つかりませんでした。")
    return {};
  }
  const access_token = match?.groups.access_token;
  const session = await getSession(request.headers.get("Cookie"));
  session.set("access_token", access_token);
  return redirect("/secret", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function Authenticated() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.value = location.hash;
    }
  }, []);
  return (
    <div>
      <h1>登録されました</h1>
      <Form method="post">
        <input ref={ref} type="hidden" name="access_token" />
        <input type="submit" />
      </Form>
    </div>
  );
}
