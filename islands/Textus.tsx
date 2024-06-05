import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";

export function Textus({ id }: { id: string }) {
  if (!IS_BROWSER) return <></>;
  const text = useSignal(localStorage.getItem("textus-" + id) || "");

  useEffect(() => {
    const innerText = document.querySelector(".textarea")?.innerText;
    const firstLine = innerText?.split("\n")[0];
    document.title = firstLine || id || "Textus";
    localStorage.setItem("textus-" + id, text.value);

    globalThis.onclick = () => document.querySelector(".textarea").focus();
  }, [text.value]);

  const handleInput = (e) => {
    const textarea = e.target;
    let value = textarea.innerHTML;
    let innerText = textarea.innerText;

    // Save the current cursor position
    const selection = window.getSelection();
    if (selection == null) return;
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(textarea);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const caretOffset = preCaretRange.toString().length;

    console.log(innerText);

    if (innerText.match(/\n(r)\n+/)) {
      value = value.replace(/r.+?$/, '<div class="r"></div>');
      text.value = textarea.parentNode.dataset.replicatedValue = value;
      textarea.innerHTML = value;

      // Restore cursor pos
      const newRange = document.createRange();
      const newSelection = window.getSelection();
      let charCount = 0, node;

      (function findNode(node) {
        for (let child of node.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            if (charCount + child.length >= caretOffset) {
              newRange.setStart(child, caretOffset - charCount);
              newRange.setEnd(child, caretOffset - charCount);
              break;
            } else {
              charCount += child.length;
            }
          } else {
            findNode(child);
          }
        }
      })(textarea);

      newSelection?.removeAllRanges();
      newSelection?.addRange(newRange);
    }
  };

  return (
    <div>
      <div className="textarea-wrap">
        <div
          class="textarea"
          contenteditable="true"
          placeholder="..."
          dangerouslySetInnerHTML={{ __html: text.value }}
          onKeyUp={handleInput}
        >
        </div>
      </div>
    </div>
  );
}
