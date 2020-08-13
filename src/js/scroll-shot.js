// FUNCIÓN SCROLL-SHOT
function scrollShot(
  windowMarginTop,
  windowMarginBottom,
  selectorCSS,
  doAfterPre,
  doBefore = () => undefined,
  doAfterPost = 0
) {
  const callbackScroll = (entries, observer) =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        doAfterPre(entry.target)
        if (!doAfterPost) {
          observer.unobserve(entry.target)
        }
      } else if (doAfterPost) {
        doAfterPost(entry.target)
      }
    })
  const observerScroll = new IntersectionObserver(callbackScroll, {
    rootMargin: windowMarginTop + ' 0px ' + windowMarginBottom + ' 0px',
  })
  document.querySelectorAll(selectorCSS).forEach(nodo => {
    observerScroll.observe(nodo)
    doBefore(nodo)
  })
}
