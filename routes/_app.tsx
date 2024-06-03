import { type PageProps } from "$fresh/server.ts";
import { WebAppify } from "../components/WebAppify.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Textus</title>
        <link rel="stylesheet" href="/css/main.css" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" />
        <WebAppify />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}

export function emojiToUrl(emoji: string) {
  return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;
}
