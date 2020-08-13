// LAZY-LOAD DATA-SRC
scrollShot(
  '0px',
  '0px',
  '[data-src]',
  nodo => {
    nodo.src = nodo.dataset.src
    if (nodo.dataset.srcset) nodo.srcset = nodo.dataset.srcset
    if (nodo.dataset.sizes) nodo.sizes = nodo.dataset.sizes
    nodo.classList.remove('lazyload')
  },
  nodo => {
    nodo.classList.add('lazyload')
    var width = nodo.getAttribute('width') || '100%'
    var height = nodo.getAttribute('height') || '100%'
    nodo.setAttribute(
      'src',
      `data:image/svg+xml,%3csvg%20width='${width}'%20height='${height}'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-miterlimit='10'%20cx='8'%20cy='8'%20r='7.5'/%3e%3cpolyline%20fill='none'%20stroke='gray'%20stroke-width='1'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-miterlimit='10'%20points='8,3 8,8 10,10'/%3e%3c/svg%3e`
    )
  }
)

// LAZY-LOAD DATA-STYLE
scrollShot(
  '0px',
  '160px',
  '[data-style]',
  nodo => (nodo.style = nodo.dataset.style)
)
