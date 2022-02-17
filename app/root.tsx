import { Outlet, LiveReload, Scripts } from "remix";


const Document = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

export default function Index() {
  return (
    <Document title="Auth&CRUD">
      <div>
        <p>------------------------------------------</p>
        <Outlet />
        <Scripts />
        <p>------------------------------------------</p>
      </div>
    </Document>
  );
}
