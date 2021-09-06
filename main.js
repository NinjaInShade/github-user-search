const body = document.body;
const ThemeSwitchTxt = document.getElementById('theme-switch-text');
const SearchError = document.getElementById('search-error');
const moonIcon = document.getElementById('moon');
const sunIcon = document.getElementById('sun');

// Submit form
function submitForm(e) {
  e.preventDefault();

  const githubUsername = document.getElementById('github-username').value;

  fetchUser(githubUsername);
}

// Fetch user by username with github API
async function fetchUser(username) {
  SearchError.classList.add('hidden');

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return SearchError.classList.remove('hidden');
    }

    return updateDOM(parsedResponse);
  } catch (err) {
    return console.log(err);
  }
}

// Updates DOM with new user data
function updateDOM(user) {
  const joinedAt = user.created_at.split('T')[0];
  const parsedJoinedAt = joinedAt.split('-');

  const year = parsedJoinedAt[0];
  const month = parsedJoinedAt[1];
  const day = parsedJoinedAt[2];

  // Converts month to shortened text version
  const date = new Date(year, month, day);
  date.setMonth(month - 1);

  const monthTxt = date.toLocaleString('en', { month: 'short' });

  console.log(monthTxt);

  const userImg = document.getElementById('user-img');
  const userImgMobile = document.getElementById('user-img-mobile');

  const userName = document.getElementById('user-name');
  const userTimeJoined = document.getElementById('user-joined-time');
  const userUsername = document.getElementById('user-username');

  userImg.src = user.avatar_url;
  userImgMobile.src = user.avatar_url;
  userTimeJoined.dateTime = joinedAt;
  userTimeJoined.innerText = `Joined ${day} ${monthTxt} ${year}`;
  userName.innerText = user.name;
  userUsername.innerText = `@${user.login}`;
  console.log(user);
}

// Toggles body class and switches over icons
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

// Default theme to be activated
initTheme();
