
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchInput");
    const resultsBox = document.getElementById("searchResults");
    let index =[];
    fetch(BASE_URL + "/search_index.json").then(r => r.json()).then(data => index = data).catch(e => console.log("Index empty"));
    
    input.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        resultsBox.innerHTML = "";
        if(q.length < 2) { resultsBox.classList.remove("active"); return; }
        
        const matches = index.filter(i => i.title.toLowerCase().includes(q) || i.content.toLowerCase().includes(q)).slice(0, 6);
        if(matches.length > 0) {
            resultsBox.classList.add("active");
            matches.forEach(m => {
                resultsBox.innerHTML += `<a href="${BASE_URL}/posts/${m.slug}.html" class="search-item"><div class="search-item-title">${m.title}</div><div class="search-item-desc">${m.content}</div></a>`;
            });
        } else {
            resultsBox.classList.remove("active");
        }
    });
    document.addEventListener("click", (e) => { if(!input.contains(e.target) && !resultsBox.contains(e.target)) resultsBox.classList.remove("active"); });
});