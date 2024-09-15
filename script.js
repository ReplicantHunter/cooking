document.getElementById('viewArticles').addEventListener('click', function() {
    document.getElementById('articles-section').classList.toggle('hidden');
    document.getElementById('post-section').classList.add('hidden');
});

document.getElementById('postArticle').addEventListener('click', function() {
    document.getElementById('post-section').classList.toggle('hidden');
    document.getElementById('articles-section').classList.add('hidden');
});

document.getElementById('articleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const articleDiv = document.createElement('div');
    articleDiv.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
    document.getElementById('articles').appendChild(articleDiv);

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    alert('Article submitted successfully!');
});

document.getElementById('searchBar').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const articles = document.querySelectorAll('#articles div');

    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});
