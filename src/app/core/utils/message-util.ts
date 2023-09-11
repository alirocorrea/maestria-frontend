export function infoMessage(msg: string) {
    return {
        severity: 'info',
        detail: msg
    }
}

export function errorMessage(msg: string) {
    return {
        severity: 'error',
        detail: msg
    }
}

export function warnMessage(msg: string) {
    return {
        severity: 'warn',
        detail: msg
    }
}

