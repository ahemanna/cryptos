const { ipcRenderer } = require('electron')

function sendForm(event) {
    event.preventDefault()
    let key = document.getElementById('key').value
    let text = document.getElementById('text').value
    let userAction
    if (document.getElementById('encrypt').checked) {
        userAction = document.getElementById('encrypt').value
    } else {
        userAction = document.getElementById('decrypt').value
    }
    var reqObj = {
        "key": key,
        "text": text,
        "userAction": userAction
    }
    ipcRenderer.send('form-submission', reqObj)
    ipcRenderer.on('form-submission-response', (event, response) => {
        document.getElementById('response').innerHTML = response;
    })
}
