import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// ---------- Hide Top Bar on Scroll ----------
const topBar = document.getElementById("topBar") as HTMLElement | null;
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (!topBar) return;

  if (window.scrollY > lastScrollY && window.scrollY > 50) {
    // scrolling down → hide top bar
    topBar.style.transform = "translateY(-100%)";
    topBar.style.opacity = "0";
  } else {
    // scrolling up → show top bar
    topBar.style.transform = "translateY(0)";
    topBar.style.opacity = "1";
  }

  lastScrollY = window.scrollY;
});