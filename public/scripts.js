// Enable Bootstrap validation
(() => {
  'use strict';
  const form = document.getElementById('quoteForm');
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    } else {
      event.preventDefault();
      alert('Thanks! Your request has been received.');
      form.reset();
      form.classList.remove('was-validated');
    }
  });
})();
