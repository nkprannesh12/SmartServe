const API = "http://localhost:5000/api/knowledge";
let allKnowledge = [];

/* =========================
   KNOWLEDGE LIST PAGE
   ========================= */
if (window.location.pathname.includes("knowledge.html")) {

  fetch(API)
    .then(res => res.json())
    .then(data => {
      allKnowledge = data;
      displayKnowledge(data);
    });

  function displayKnowledge(list) {
    let html = "";

    if (list.length === 0) {
      html = "<p>No knowledge found.</p>";
    }

    list.forEach(item => {
      html += `
        <div class="knowledge-card">
          <h3>
            <a href="article.html?id=${item.id}">
              ${item.title}
            </a>
          </h3>
          <div class="category">${item.category}</div>
          <p>${item.content.substring(0, 100)}...</p>
        </div>
      `;
    });

    document.getElementById("knowledgeList").innerHTML = html;
  }

  // Search function
  function searchKnowledge() {
    const keyword = document
      .getElementById("searchInput")
      .value
      .toLowerCase();

    const filtered = allKnowledge.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.content.toLowerCase().includes(keyword)
    );

    displayKnowledge(filtered);
  }

  // Make search function global
  window.searchKnowledge = searchKnowledge;
}

/* =========================
   ARTICLE DETAILS PAGE
   ========================= */
if (window.location.pathname.includes("article.html")) {

  const titleEl = document.getElementById("articleTitle");
  const categoryEl = document.getElementById("articleCategory");
  const contentEl = document.getElementById("articleContent");

  if (titleEl && categoryEl && contentEl) {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`${API}/${id}`)
      .then(res => res.json())
      .then(data => {
        titleEl.innerText = data.title;
        categoryEl.innerText = data.category;
        contentEl.innerText = data.content;
      })
      .catch(err => {
        console.error(err);
        alert("Unable to load article");
      });

  } else {
    console.error("Article elements missing in HTML");
  }
}
