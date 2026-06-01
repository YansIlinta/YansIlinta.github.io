(function () {
  const data = window.XUAN_HOME_DATA;
  if (!data) return;

  const path = window.location.pathname.replace(/\/index\.html$/, '/');
  if (path !== '/' && path !== '') return;

  const recentPosts = document.querySelector('#recent-posts');
  if (!recentPosts || document.querySelector('.xuan-academic-home')) return;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function tagList(tags) {
    const list = el('div', 'xuan-home-tags');
    (tags || []).forEach(tag => list.appendChild(el('span', '', tag)));
    return list;
  }

  function entryCard(item, kind) {
    const card = item.url ? document.createElement('a') : document.createElement('div');
    card.className = `xuan-home-entry ${kind}`;
    if (item.url) card.href = item.url;

    const eyebrow = el('span', 'xuan-home-entry-type', kind === 'project' ? 'PROJECT' : 'ARTICLE');
    const title = el('strong', 'xuan-home-entry-title', item.title);
    const summary = el('p', 'xuan-home-entry-summary', item.summary || '');
    const meta = el('div', 'xuan-home-entry-meta');

    if (item.date) meta.appendChild(el('span', '', item.date));
    meta.appendChild(tagList(item.tags));

    card.appendChild(eyebrow);
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(meta);
    return card;
  }

  function placeholderCard() {
    const card = el('div', 'xuan-home-entry project is-placeholder');
    card.appendChild(el('span', 'xuan-home-entry-type', 'PROJECT'));
    card.appendChild(el('strong', 'xuan-home-entry-title', data.placeholder.title));
    card.appendChild(el('p', 'xuan-home-entry-summary', data.placeholder.summary));
    card.appendChild(tagList(data.placeholder.tags));
    return card;
  }

  const section = el('section', 'xuan-academic-home');
  const profile = el('div', 'xuan-home-profile');
  const avatar = el('img', 'xuan-home-avatar');
  avatar.src = '/imk/tak.jpg';
  avatar.alt = data.title;

  const copy = el('div', 'xuan-home-copy');
  copy.appendChild(el('span', 'xuan-home-kicker', 'Creator archive'));
  copy.appendChild(el('h2', 'xuan-home-title', data.title));
  copy.appendChild(el('p', 'xuan-home-intro en', data.intro_en));
  copy.appendChild(el('p', 'xuan-home-intro zh', data.intro_zh));

  profile.appendChild(avatar);
  profile.appendChild(copy);

  const preview = el('div', 'xuan-home-preview');
  const projects = el('div', 'xuan-home-group');
  projects.appendChild(el('h3', '', 'Projects'));
  const projectGrid = el('div', 'xuan-home-grid');
  (data.projects || []).slice(0, 2).forEach(item => projectGrid.appendChild(entryCard(item, 'project')));
  while (projectGrid.children.length < 2) projectGrid.appendChild(placeholderCard());
  projects.appendChild(projectGrid);

  const articles = el('div', 'xuan-home-group');
  articles.appendChild(el('h3', '', 'Recent writing'));
  const articleGrid = el('div', 'xuan-home-grid');
  (data.articles || []).slice(0, 2).forEach(item => articleGrid.appendChild(entryCard(item, 'article')));
  articles.appendChild(articleGrid);

  preview.appendChild(projects);
  preview.appendChild(articles);
  section.appendChild(profile);
  section.appendChild(preview);
  recentPosts.parentNode.insertBefore(section, recentPosts);
})();
