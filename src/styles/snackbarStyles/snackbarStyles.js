import {colors} from "../colors";

const closeStyle = {
    position: 'absolute',
    color: 'white',
    fontSize: '10px',
    alignItems: 'flex-start',
    right: '12px',
    bottom: '42px',
    width: '10px',
    height: '10px',
    padding: '0',
    margin: '0',
}

const snackbarStyles = {
    color: '#FFFFFF',
    fontFamily: 'Raleway, sans-serif',
    fontWeight: '500',
    minWidth: '320px',
    minHeight: '60px',
    fontSize: '12px',
    letterSpacing: '0.05em',
    textAlign: 'left',
}

export const error = {
    position: 'top-right',
    style: {
        backgroundColor: '#EB5757',
        ...snackbarStyles
    },
    closeStyle
}

export const success = {
    position: 'top-right',
    style: {
        backgroundColor: colors.brand,
        ...snackbarStyles
    },
    closeStyle
}

export const info = {
    position: 'top-right',
    style: {
        backgroundColor: '#2F80ED',
        ...snackbarStyles
    },
    closeStyle
}

export const warning = {
    position: 'top-right',
    style: {
        backgroundColor: '#E2B93B',
        ...snackbarStyles
    },
    closeStyle
}
