;
(() => {
    if (!!window.navigator.serviceWorker) {
        window.navigator.serviceWorker
            .register('./sw.js');
    }

    let deferredEvent;
    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault()
        deferredEvent = event
        return false
    })

    const installButton = document.querySelector('#btn-install')
    installButton.addEventListener('click', event => {
        if (deferredEvent) {
            deferredEvent.prompt()
            deferredEvent.userChoice.then(choiceResult => {
                if (choiceResult.outcome !== 'dismissed') {
                    installButton.classList.add('hidden')
                    localStorage.setItem('install-status', 'installed')
                }

                deferredEvent = null
            })
        }
    })

    if (localStorage.getItem('install-status') !== 'installed') {
        installButton.classList.remove('hidden')
    }

    const updateButton = document.querySelector('#btn-update')
    updateButton.addEventListener('click', event => {
        // see sw-update-checker.js
        if (window.swUpdate) {
            window.swUpdate()
        }
    })

    // see sw-update-checker.js
    if (window.checkSwUpdate) {
        updateButton.classList.add('hidden')
        window.checkSwUpdate().then(result => {
            if (!!result) {
                updateButton.classList.remove('hidden')
            }
        })
    }
})();