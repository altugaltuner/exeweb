// typewriter tagline
(function(){
  var el = document.getElementById('typedLine');
  var text = "A terminal driven hacking thriller.";
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){ el.textContent = text; return; }
  var i = 0;
  function tick(){
    el.textContent = text.slice(0, i);
    i++;
    if(i <= text.length){ setTimeout(tick, 28); }
  }
  tick();
})();

// trace counter loop
(function(){
  var el = document.getElementById('tracePct');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){ return; }
  var v = 4;
  setInterval(function(){
    v += 1;
    if(v > 41){ v = 0; }
    el.textContent = String(v).padStart(2,'0');
  }, 1400);
})();

// art preview modal
(function(){
  var previews = document.querySelectorAll('.art-preview');
  if (!previews.length) return;

  var modal = document.createElement('div');
  modal.className = 'art-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Artwork preview');
  modal.hidden = true;
  modal.innerHTML = '<div class="art-modal__backdrop" data-close-modal></div>' +
    '<div class="art-modal__panel">' +
    '<button class="art-modal__close" type="button" aria-label="Close artwork preview" data-close-modal>×</button>' +
    '<img class="art-modal__image" alt="">' +
    '<div class="art-modal__caption"></div>' +
    '</div>';
  document.body.appendChild(modal);

  var modalImage = modal.querySelector('.art-modal__image');
  var modalCaption = modal.querySelector('.art-modal__caption');
  var closeButton = modal.querySelector('.art-modal__close');
  var lastFocused;

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  function openModal(image) {
    lastFocused = document.activeElement;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt;
    modalCaption.textContent = image.closest('.art-card').querySelector('.name').textContent;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    closeButton.focus();
  }

  previews.forEach(function(image) {
    image.addEventListener('click', function() { openModal(image); });
    image.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(image);
      }
    });
  });

  modal.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-close-modal')) closeModal();
  });
  document.addEventListener('keydown', function(event) {
    if (!modal.hidden && event.key === 'Escape') closeModal();
  });
})();
