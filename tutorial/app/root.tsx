import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import appStylesHref from "./app.css?url";

import { ContactRecord, getContacts } from "./data";

export function links() {
  return {
    rel: "stylesheet",
    href: appStylesHref,
  }
}

export async function loader() {
  const contacts = await getContacts();
  return json({contacts});
}

export default function App() {
  const {contacts} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <title>Remix Tutorial</title>
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length > 0 ? <ul>
              {contacts.map((contact) => {
                return <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                  {contact.first} {contact.last}</Link>
                  </li>
            })} </ul>
            : <p>No contacts</p>}
            <ul>
              <li>
                <Link to={`/contacts/1`}>Your Name</Link>
              </li>
              <li>
                <Link to={`/contacts/2`}>Your Friend</Link>
              </li>
            </ul>
          </nav>
        </div>

        <main id="detail">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
