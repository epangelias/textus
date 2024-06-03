import { FreshContext } from "$fresh/server.ts";
import { Textus } from "../islands/Textus.tsx";

export default function Home(ctx: FreshContext) {
  return (
    <div>
      <Textus id={ctx.params.id} />
    </div>
  );
}
