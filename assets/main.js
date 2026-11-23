
const tools = document.querySelector('.pub-tools');
if (tools) {
  tools.hidden = false;
  const query = document.querySelector('#publication-search');
  const year = document.querySelector('#publication-year');
  const papers = [...document.querySelectorAll('.paper')];
  const count = document.querySelector('#publication-count');
  const empty = document.querySelector('#publication-empty');
  function filterPublications() {
    const words = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const paper of papers) {
      const text = paper.textContent.toLocaleLowerCase();
      paper.hidden = !((year.value === 'all' || paper.dataset.year === year.value) && words.every(word => text.includes(word)));
      if (!paper.hidden) visible++;
    }
    count.textContent = visible === papers.length ? `Showing all ${papers.length} publications` : `Showing ${visible} of ${papers.length} publications`;
    empty.hidden = visible !== 0;
  }
  query.addEventListener('input', filterPublications);
  year.addEventListener('change', filterPublications);
}
const printButton = document.querySelector('#print-cv');
if (printButton) { printButton.hidden = false; printButton.addEventListener('click', () => window.print()); }

const visitorMap = document.querySelector('#visitor-map');
if (visitorMap && location.protocol === 'https:' && location.hostname === visitorMap.dataset.siteHost) {
  const url = new URL(visitorMap.dataset.widgetSrc);
  if (url.hostname === 'mapmyvisitors.com' && ['/map.js','/globe.js','/map.png'].includes(url.pathname)) {
    visitorMap.replaceChildren();
    if (visitorMap.dataset.widgetKind === 'script') {
      const script = document.createElement('script'); script.id='mapmyvisitors'; script.src=url.href; script.async=true; visitorMap.append(script);
    } else {
      const img=document.createElement('img');img.src=url.href;img.alt='Visitor map and pageview statistics';img.width=320;img.height=220;visitorMap.append(img);
    }
  }
}
const previewDialog = document.querySelector('#paper-preview');
if (previewDialog) {
  for (const button of document.querySelectorAll('.paper-thumb')) {
    button.addEventListener('click', () => {
      previewDialog.querySelector('img').src = button.querySelector('img').src;
      previewDialog.querySelector('img').alt = button.querySelector('img').alt;
      previewDialog.querySelector('h2').textContent = button.closest('.paper').querySelector('.paper-title').textContent;
      previewDialog.showModal();
    });
  }
  previewDialog.querySelector('.preview-close').addEventListener('click', () => previewDialog.close());
  previewDialog.addEventListener('click', event => { if (event.target === previewDialog) { const rect=previewDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) previewDialog.close(); } });
}
