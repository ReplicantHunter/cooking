const repoOwner = 'ReplicantHunter'; // Replace with your GitHub username
const repoName = 'cooking';       // Replace with your GitHub repository name
const personalAccessToken = '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'; // Replace with your GitHub token

// Fetch articles from GitHub Issues
function fetchArticles() {
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`)
        .then(response => response.json())
        .then(data => {
            const articlesDiv = document.getElementById('articles');
            articlesDiv.innerHTML = ''; // Clear previous articles
            data.forEach(issue => {
                displayArticle(issue.title, issue.body);
            });
        })
        .catch(error => console.error('Error fetching issues:', error));
}

// Display articles on the page
function displayArticle(title, content) {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'article';
    articleDiv.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
    document.getElementById('articles').appendChild(articleDiv);
}

// Show or hide sections based on button clicks
document.getElementById('viewArticles').addEventListener('click', function() {
    document.getElementById('viewArticlesSection').style.display = 'block';
    document.getElementById('post-section').style.display = 'none';
    fetchArticles(); // Fetch and display articles
});

document.getElementById('postArticle').addEventListener('click', function() {
    document.getElementById('post-section').style.display = 'block';
    document.getElementById('viewArticlesSection').style.display = 'none';
});

// Handle form submission for posting a new article
document.getElementById('articleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Post a new issue (article) to GitHub
    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${personalAccessToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: content
        })
    })
    .then(response => response.json())
    .then(() => {
        alert('Article submitted successfully!');
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        // Optionally reload articles after submission
        fetchArticles();
    })
    .catch(error => console.error('Error posting article:', error));
});
