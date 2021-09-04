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

// Default user to be displayed
fetchUser('NinjaInShade');
