import {createMuiTheme} from "@material-ui/core/styles";
import {colors} from "styles/colors";

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Raleway, sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        button: {
            textTransform: 'none',
            fontSize: '16px',
        }
    },
    palette: {
        primary: {
            main: '#242424',
        },
        secondary: {
            main: '#C0A796',
        },
        error: {
            main: '#BA886E',
        },
    },
    overrides: {
        MuiTypography: {
            colorTextSecondary: {
                color: '#242424',
            },
            root: {
                fontFamily: 'Roboto, sans-serif',
            },
            h1: {
                fontSize: '100px',
                fontFamily: 'Gallient Regular',
                fontWeight: '400',
                color: colors.brand,
            },
            h2: {
                fontSize: '50px',
                fontFamily: 'MADE Mirage Regular',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '60px',
                color: '#94745C',
            },
            h3: {
                fontSize: '32px',
                fontFamily: 'MADE Mirage Regular',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '50px',
                color: '#BA886E',
                letterSpacing: '0.05em',
            },
            h4: {
                fontSize: '50px',
                fontFamily: 'MADE Mirage Regular',
                fontStyle: 'normal',
                fontWeight: '400',
                color: '#BA886E',
            },
            h5: {
                fontSize: '30px',
                fontFamily: 'MADE Mirage Regular',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '50px',
                color: colors.black1,
                letterSpacing: '0.05em',
            },
            body1: {
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.05em'
            },
            body2: {
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.05em'
            },
            subtitle2: {
                fontSize: '16px',
                fontWeight: '700',
                letterSpacing: '0.05em'
            }
        },
        MuiButton: {
            root: {
                borderRadius: '0px',
                backgroundColor: '#242424',
                width: '130px',
                height: '50px',
            },
            label: {
                fontWeight: '600',
            },
        },
        MuiInputLabel: {
            root: {
                fontSize: '19px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                color: '#242424',
            }
        },
        MuiInput: {
            root: {
                fontSize: '14px',
                paddingBottom: '5px'
            },
            formControl: {
                'label + &': {
                    marginTop: '30px',
                },
                "& input::placeholder": {
                    fontSize: "14px",
                    letterSpacing: '0.05em',
                },
                underline: {
                    '&:after': {
                        backgroundColor: '#EB5757',
                    }
                },
            }
        },
        MuiFormControlLabel: {
            root: {
                position: 'relative',
            },
            label: {
                fontFamily: 'Roboto, sans-serif',
                fontSize: '14px',
                color: colors.brand,
                lineHeight: '20px',
                letterSpacing: '0',
            }
        },
        MuiCheckbox: {
            colorSecondary: {
                color: colors.brand,
                '&$checked': {
                    color: '#custom color',
                },
            },
        },
        MuiCard: {
            root: {
                borderRadius: '20px 20px 0px 0px',
                maxWidth: '850px',
                boxShadow: '0px 15px 50px rgba(0, 0, 0, 0.05)',
                '@media (max-width:500px)': {
                    borderRadius: '0',
                    margin: '0 20px'
                },
            }
        },
        MuiCardMedia: {
            root: {
                boxShadow: '0',
            }
        },
        MuiCardContent: {
            root: {
                textAlign: 'center',
            }
        },
        MuiCardActions: {
            root: {
                textAlign: 'center',
                justifyContent: 'center',
            }
        },
        MuiTextField: {
            root: {
                "& .Mui-error": {
                    color: '#EB5757'
                },
                "& .MuiFormHelperText-root": {
                    color: '#EB5757'
                },

            }
        },
        MuiOutlinedInput: {
            input: {
                '&:-webkit-autofill': {
                    '-webkit-box-shadow': '0 0 0 100px #000 inset',
                    '-webkit-text-fill-color': '#fff'
                }
            },
            root: {
                border: '1px solid #E8E8E8',
                borderRadius: 0
            }
        },
        MuiAppBar: {
            root: {
                boxShadow: 'none',
                borderBottom: '0.01em solid rgba(189, 140, 115, 0.3)',
            },
            colorPrimary: {
                color: colors.brand,
                backgroundColor: 'unset'
            }
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: "none"
                }
            }
        },
        MuiDataGrid: {
            root: {
                border: 'none',
                '& .MuiDataGrid-iconSeparator': {
                    display: 'none',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    color: `${colors.brand}`,
                    fontWeight: '600',
                    fontSize: '12px',
                    height: '45px'
                },
                '& .MuiDataGrid-columnsContainer': {
                    borderBottom: '2px solid rgba(235, 220, 213, 0.7)',
                },
                '& .MuiDataGrid-cell': {
                    padding: '0 20px'
                },
            },
        },
        MuiPaper: {
            rounded: {
                borderRadius: '0'
            },
            elevation24: {
                boxShadow: '0px 15px 15px rgba(0, 0, 0, 0.15)',
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: 'rgba(251, 248, 243, 0.6)',
            }
        },
        MuiDialogTitle: {
            root: {
                padding: '0'
            }
        },
        MuiDialogContent: {
            dividers: {
                borderTop: 'none',
                borderBottom: 'none',
                padding: '0',
            }
        },
        MuiTab: {
            root: {
                fontWeight: '600',
                fontSize: '14px',
                letterSpacing: '0.05em',
                padding: '0',
                '@media (min-width:600px)': {
                    minWidth: 'unset',
                }
            },
        },
        MuiTabs: {
            flexContainer: {
                '& > :first-child': {
                    marginLeft: '30px',
                },
                "& > *": {
                    marginLeft: '40px',
                }
            }
        },
        MuiBox: {
            root: {
                padding: '0',
            }
        },
        MuiDialogActions: {
            root: {
                padding: '0',
            }
        },
        MuiPickersDay: {
            root: {
                borderRadius: '0',
            }
        },
        MuiSelect: {
            icon: {
                color: colors.brand
            },
            iconOutlined: {
                right: 0,
                padding: '10px',
                background: colors.brand,
                color: 'white',
                height: '100%',
                top: 0,
                width: '55px',
            }
        },
        MuiChip: {
            deleteIcon: {
                color: 'white',
                '&:hover': {
                    color: 'white'
                }
            },
            clickable: {
                backgroundColor: colors.gray2,
                color: 'white',
                borderRadius: '5px',
                height: '24px',
                marginTop: '9px !important',
                '&: hover': {
                    backgroundColor: `${colors.gray2}`,
                }
            }
        },
        MuiMenuItem: {
            root: {
                color: colors.brand,
                fontSize: '14px',
                letterSpacing: '0.05em',
                fontWeight: '600'
            }
        },
        MuiList: {
            padding: {
                paddingTop: '0',
                paddingBottom: '0',
            }
        },
        MuiListItem: {
            button: {
                paddingLeft: '13px',
                paddingRight: '22px',
            }
        },
        MuiMenu: {
            paper: {
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
            }
        }
    },
});

export default theme;