// Open something
function clickShow(show) {
    show = document.querySelector(show);
    if (show.style.display == 'block') {
        show.style.display = 'none';
    } else {
        show.style.display = 'block';
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('sw_cached_site.js')
        .then(reg => console.log('Service worker: Registered (Pages)'))
        .catch(err => console.log(`Service worker: ERROR: ${err}`))
    })
}