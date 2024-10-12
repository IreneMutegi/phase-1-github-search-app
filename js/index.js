// Select DOM elements
const searchForm = document.getElementById('github-form'); // Use the correct form ID
const searchInput = document.getElementById('search'); // Use the correct input ID
const userResults = document.getElementById('user-list'); // Use the correct user list ID
const repoResults = document.getElementById('repos-list'); // Use the correct repos list ID

// Function to search users by keyword
function searchUsers(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    const query = searchInput.value;

    fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayUsers(data.items); // Display the user results
    })
    .catch(error => console.error('Error fetching users:', error));
}

// Function to display user results
function displayUsers(users) {
    userResults.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <h3>${user.login}</h3>
            <img src="${user.avatar_url}" alt="${user.login}" width="50">
            <a href="${user.html_url}" target="_blank">Profile</a>
        `;
        userDiv.addEventListener('click', () => fetchUserRepos(user.login)); // Add click event
        userResults.appendChild(userDiv); // Append user info to the results
    });
}

// Function to fetch repositories for a selected user
function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayRepos(data); // Display the repository results
    })
    .catch(error => console.error('Error fetching repositories:', error));
}

// Function to display repository results
function displayRepos(repos) {
    repoResults.innerHTML = ''; // Clear previous repo results

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">Repo Link</a>
        `;
        repoResults.appendChild(repoDiv); // Append repo info to the results
    });
}

// Event listener for form submission
searchForm.addEventListener('submit', searchUsers);
