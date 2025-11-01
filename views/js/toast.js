// Tabler Toast function
// Usage: showToast('Message', 'info'|'success'|'danger'|'warning', duration_ms)
(function(global) {
  function showToast(message, type = 'info', duration = 3500) {
    const icons = {
      info:   '<svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-blue" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      success:'<svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-green" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"/></svg>',
      danger: '<svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-red" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      warning:'<svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-yellow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v2m0 4h.01"/><circle cx="12" cy="12" r="9"/></svg>'
    };
    const color = {
      info:   'bg-blue-lt',
      success:'bg-green-lt',
      danger: 'bg-red-lt',
      warning:'bg-yellow-lt'
    };
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style = 'position: fixed; top: 24px; right: 24px; z-index: 9999; min-width: 320px; max-width: 90vw;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast show ${color[type] || color.info}`;
    toast.style = 'box-shadow: 0 2px 8px rgba(32,107,196,0.07); border-radius: 8px; margin-bottom: 12px; min-width: 320px; max-width: 90vw;';
    toast.innerHTML = `
      <div class="d-flex align-items-center p-3">
        ${icons[type] || icons.info}
        <div style="flex:1;">${message}</div>
        <button type="button" class="btn-close ms-2" aria-label="Close" style="background:none;border:none;font-size:1.5rem;line-height:1;" onclick="this.closest('.toast').remove()"></button>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }
  global.showToast = showToast;
})(window);
