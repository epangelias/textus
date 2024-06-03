import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export function Textus({ id }: { id: string }) {
  const defaultText = localStorage ? localStorage.getItem("textus-" + id) : "";
  const text = useSignal(defaultText || "");

  useEffect(() => {
    const firstLine = text.value.split("\n")[0];
    document.title = firstLine || id || "Textus";
    localStorage.setItem("textus-" + id, text.value);
  }, [text.value]);

  return (
    <div>
      <div className="textarea-wrap">
        <textarea
          placeholder="Textus"
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
