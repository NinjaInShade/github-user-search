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

// Switch light themes
function switchTheme() {
  const body = document.body;
  const ThemeSwitchTxt = document.getElementById('theme-switch-text');
  const moonIcon = document.getElementById('moon');
  const sunIcon = document.getElementById('sun');

  if (body.classList.contains('dark-theme')) {
    ThemeSwitchTxt.innerText = 'Dark';
  } else {
    ThemeSwitchTxt.innerText = 'Light';
  }

  moonIcon.classList.toggle('hidden');
  sunIcon.classList.toggle('hidden');
  body.classList.toggle('dark-theme');
}

// Default user to be displayed
fetchUser('NinjaInShade');

// If user has dark preference, set the dark theme by default.
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
  document.body.classList.add('dark-theme');
} else {
  document.body.classList.remove('dark-theme');
}
