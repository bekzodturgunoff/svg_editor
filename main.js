const download_button = document.getElementById("download-btn");

class Editor {
  constructor(items) {
    this.items = items;
    this.editing = undefined;
    this.color_picker = document.getElementById("color-picker");

    this.listen();
  }
  static from(items) {
    return new Editor(items);
  }

  listen() {
    const that = this;
    for (const item of this.items) {
      item.addEventListener("click", (e) => {
        that.select(e.target);
        this.color_picker.style.setProperty("--top", `${e.clientY}px`);
        this.color_picker.style.setProperty("--left", `${e.clientX}px`);
      });
    }

    this.color_picker.addEventListener(
      "change",
      this.on_color_change.bind(this)
    );
  }

  select(item) {
    this.editing = item;
    this.color_picker.click();
  }

  on_color_change(e) {
    const value = e.target.value;
    this.editing.style.setProperty("--fill", value);
    this.editing.setAttribute("fill", value);
  }
}

Editor.from(document.querySelectorAll(".editable"));

download_button.addEventListener("click", on_download);
function on_download() {
  const svg = document.querySelector("svg").outerHTML;
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nobita.svg";

  document.body.append(a);
  a.click();
  a.remove();
}
