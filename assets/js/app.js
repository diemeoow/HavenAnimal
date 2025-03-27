document.querySelector('.filter-gender').addEventListener('click', function() {
    this.closest('.filters').classList.toggle('active');
  });
  
  // Закрытие при клике вне фильтра
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.filters')) {
      document.querySelector('.filters').classList.remove('active');
    }
  })