const nepaliApiUrl =
  "https://newspolar.com/wp-json/wp/v2/posts?per_page=4&_embed";
const englishApiUrl =
  "https://enewspolar.com/wp-json/wp/v2/posts?per_page=4&_embed";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function getImage(post) {
  if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url;
  if (
    post._embedded &&
    post._embedded["wp:featuredmedia"] &&
    post._embedded["wp:featuredmedia"][0] &&
    post._embedded["wp:featuredmedia"][0].source_url
  ) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }
  return "https://via.placeholder.com/400x200?text=News";
}

function renderNews(news, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  news.slice(0, 4).forEach((post) => {
    const img = getImage(post);
    const title = decodeHTML(post.title.rendered);
    const cleanExcerpt = decodeHTML(post.excerpt.rendered).replace(
      /<[^>]+>/g,
      ""
    );
    const words = cleanExcerpt.split(/\s+/).slice(0, 25).join(" ");
    const excerpt = words + "...";

    const card = document.createElement("div");
    card.className = `
      bg-white  
      shadow-sm 
      hover:shadow-lg 
      hover:scale-105 
      transition-transform 
      duration-300 
      flex flex-col 
      overflow-hidden
    `.trim();

    card.innerHTML = `
      <img src="${img}" alt="${title}" class="mb-4 h-60 w-full object-cover" />
      <h3 class="font-semibold text-lg text-blue-900 mb-2 p-4 tracking-wide">${title}</h3>

      <a href="${post.link}" target="_blank" class="text-[#ec1f28] hover:underline px-4 mt-auto mb-2 w-fit">Read more &rarr;</a>
    `;
    container.appendChild(card);
  });
}

fetch(nepaliApiUrl)
  .then((res) => res.json())
  .then((posts) => renderNews(posts, "news-container"))
  .catch((err) => {
    document.getElementById("news-container").innerHTML =
      "<div class='text-white'>News could not be loaded.</div>";
    console.error("Error fetching Nepali news:", err);
  });

fetch(englishApiUrl)
  .then((res) => res.json())
  .then((posts) => renderNews(posts, "enews-container"))
  .catch((err) => {
    document.getElementById("enews-container").innerHTML =
      "<div class='text-white'>News could not be loaded.</div>";
    console.error("Error fetching English news:", err);
  });
