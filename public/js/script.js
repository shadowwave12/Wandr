// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

(() => {
  const root = document.body;
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!root || !toggle) return;

  const STORAGE_KEY = "wander-theme";
  const mediaQuery = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
  let hasUserPreference = Boolean(localStorage.getItem(STORAGE_KEY));
  const initialTheme = hasUserPreference
    ? localStorage.getItem(STORAGE_KEY)
    : mediaQuery && mediaQuery.matches
      ? "dark"
      : "light";

  applyTheme(initialTheme, hasUserPreference);

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    hasUserPreference = true;
    applyTheme(nextTheme, true);
  });

  if (mediaQuery) {
    const handleChange = (event) => {
      if (!hasUserPreference) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }
  }

  function applyTheme(theme, persistPreference) {
    root.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    toggle.classList.toggle("is-dark", theme === "dark");
    toggle.setAttribute("aria-pressed", theme === "dark");
    if (persistPreference) {
      localStorage.setItem(STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
})();
