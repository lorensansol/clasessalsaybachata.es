// APARECER CON SCROLL HACIA ARRIBA
scrollShot(
  '-15%',
  '-15%',
  '[data-showup]',
  nodo => nodo.classList.remove('showup'),
  nodo => nodo.classList.add('showup')
)
