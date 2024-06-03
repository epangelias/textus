import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export function Textus({ id }: { id: string }) {
  if (!IS_BROWSER) return <></>;
  const text = useSignal(localStorage.getItem("textus-" + id) || "");

  useEffect(() => {
    const firstLine = text.value.split("\n")[0];
    document.title = firstLine || id || "Textus";
    localStorage.setItem("textus-" + id, text.value);
  }, [text.value]);

  return (
    <div>
      <div className="textarea-wrap">
        <textarea
          placeholder="..."
          value={text}
          onInput={(e) =>
            text.value = e.target.parentNode.dataset.replicatedValue = e.target
              .value}
        >
        </textarea>
      </div>
    </div>
  );
}
