const alert = (message) => {
    return message;
}

const alert2 = () => {
    return 'Finished!'
}

function makeAlert() {
    return 'Normal function'
}

// export default {
//     alert,
//     alert2,
//     makeAlert
// }

export default {
    onSave: () => {
        return 'Saved!'
    },
    onFail: () => {
        return 'Failed!'
    }
}