// FUNCIÓN CARGAR ARCHIVOS SCRIPTS
function loadScript(url, callback) {
  var s = document.createElement('script')
  s.onload = callback
  s.src = url
  document.querySelector('head').appendChild(s)
}

// SCROLL BEHAVIOR SMOOTH EN NAVEGADORES INCOMPATIBLES (SAFARI) IMPORTANDO smoothscroll.min.js
if (!('scrollBehavior' in document.documentElement.style)) {
  function smoothScroll() {
    var anchorOffset = 48
    var links = document.querySelectorAll('[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', click => {
        click.preventDefault()
        var target = document.querySelector(link.getAttribute('href'))
        target.scrollIntoView({ behavior: 'smooth' })
        //target.setAttribute('tabindex', '-1');
        //target.focus();
      })
    })
  }
  loadScript('/js/smooth-scroll.min.js', smoothScroll)
}
