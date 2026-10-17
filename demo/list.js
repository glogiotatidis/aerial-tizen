function buildCatalogList(catalog, doc) {
  var root = doc.createElement('div');
  var groups = {};
  var order = [];
  catalog.forEach(function (video) {
    if (!groups[video.category]) {
      groups[video.category] = [];
      order.push(video.category);
    }
    groups[video.category].push(video);
  });
  order.forEach(function (category) {
    var heading = doc.createElement('h2');
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' (' + groups[category].length + ')';
    root.appendChild(heading);
    groups[category].forEach(function (video) {
      var row = doc.createElement('div');
      var link = doc.createElement('a');
      link.textContent = video.label;
      link.setAttribute('href', video.url);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      var text = doc.createElement('span');
      text.textContent = video.description;
      row.appendChild(link);
      row.appendChild(text);
      root.appendChild(row);
    });
  });
  return root;
}

function toggleCatalogList() {
  var panel = document.getElementById('catalog-list');
  if (!panel.firstChild) panel.appendChild(buildCatalogList(CATALOG, document));
  panel.classList.toggle('open');
}
