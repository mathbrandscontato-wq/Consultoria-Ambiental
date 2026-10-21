// Apenas menu de navegação, sem tracking ou envio.
for (const menu of document.querySelectorAll(".ha-mobile-menu")) {
  const button = menu.querySelector("summary");
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      button?.focus();
    }
  });
  for (const link of menu.querySelectorAll("nav a")) {
    link.addEventListener("click", () => { menu.open = false; });
  }
}
