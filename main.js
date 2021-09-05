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
  document.body.classList.toggle('dark-theme');
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
