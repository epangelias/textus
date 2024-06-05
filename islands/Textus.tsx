import { useComputed, useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export function Textus({ id }: { id: string }) {
  if (!IS_BROWSER) return <></>;
  const text = useSignal(localStorage.getItem("textus-" + id) || "");
  const empty = useComputed(() => !text.value.trim());

  useEffect(() => {
    globalThis.onclick = () => document.querySelector(".textbox").focus();
  }, []);

  useEffect(() => {
    const firstLine = text.value.split("\n")[0];
    document.title = firstLine || id || "Textus";
    localStorage.setItem("textus-" + id, text.value);
  }, [text.value]);

  function updateValue(e: Event) {
    const target = e.target as HTMLDivElement;
    text.value = target.innerText;
  }

  return (
    <div>
      <div className="textarea-wrap">
        <div
          class={`textbox${empty.value ? " empty" : ""}`}
          contenteditable
          role="textbox"
          placeholder="..."
          value={text}
          onKeyDown={updateValue}
          onKeyUp={updateValue}
        >
        </div>
      </div>
    </div>
  );
}
