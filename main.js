const body = document.body;
const ThemeSwitchTxt = document.getElementById('theme-switch-text');
const moonIcon = document.getElementById('moon');
const sunIcon = document.getElementById('sun');

// Fetch user by username with github API
function fetchUser(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      return res.json();
    })
    .then((user) => {
      return updateDOM(user);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Updates DOM with new data
function updateDOM(user) {
  console.log(user);
}

function updateThemeClasses() {
  moonIcon.classList.toggle('hidden');
  sunIcon.classList.toggle('hidden');
  body.classList.toggle('dark-theme');
}

// Switch light themes
function switchTheme() {
  // If it contains dark-theme class, we're switching to light theme
  if (body.classList.contains('dark-theme')) {
    ThemeSwitchTxt.innerText = 'Dark';

    localStorage.setItem('theme', 'light');
  } else {
    ThemeSwitchTxt.innerText = 'Light';

    localStorage.setItem('theme', 'dark');
  }

  return updateThemeClasses();
}

function initTheme() {
  // If user has dark preference, set the dark theme by default.
  // LocalStorage overrides this however, as the user has then changed the theme,
  // which we want to persist to those settings then.
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark') {
    ThemeSwitchTxt.innerText = 'Light';

    return updateThemeClasses();
  }

  if (prefersDarkScheme.matches) {
    ThemeSwitchTxt.innerText = 'Dark';

    return updateThemeClasses();
  }
}

// Default user to be displayed
fetchUser('NinjaInShade');

// Default theme
initTheme();
