(() => {
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
                    // DISPLAY HERE A SUCCESS INSTALL MESSAGE ON DOM
                }

                deferredEvent = null
            })
        }
    })

    if (localStorage.getItem('install-status') !== 'installed') {
        installButton.classList.remove('hidden')
    }
})()