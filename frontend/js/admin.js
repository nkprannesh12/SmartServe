const API = "http://localhost:5000/api/knowledge";

function addKnowledge() {
  const data = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    department: document.getElementById("department").value,
    priority: document.getElementById("priority").value,
    author: document.getElementById("author").value,
    tags: document.getElementById("tags").value.split(",").map(t => t.trim()),
    content: document.getElementById("content").value
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to add article");
      }
      return res.json();
    })
    .then(() => {
      alert("Article added successfully");
      window.location.href = "knowledge.html";
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add article");
    });
}
