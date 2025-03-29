import { create } from "zustand";

export const UsethemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") ||"light",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme); // add this line
  }
})); // eslint-disable-line
