if (data.data.length > 0) {
  data.data.forEach(gif => {
    const gifUrl = gif.images.original.url;
    const wrapper = document.createElement("div");
    const img = document.createElement("img");
    img.src = gifUrl;
    wrapper.appendChild(img);
    gifContainer.appendChild(wrapper);
  });
} else {
  alert("No GIFs found for this category!");
}
