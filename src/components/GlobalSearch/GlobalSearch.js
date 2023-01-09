import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {InputAdornment, makeStyles, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {colors} from "../../styles/colors";
import {DialogTitle} from "@core/components";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import {
    clearGlobalSearch, globalSearch,
    globalSearchSelector,
    setSearchQuery
} from "redux/features/globalSearch/globalSearchSlice";
import {useDispatch, useSelector} from "react-redux";
import {debounce} from "debounce";
import SearchList from "./SearchList";

const useStyles = makeStyles(() => ({
    rootDialogContent: {
        padding: 0,
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        position: 'absolute',
        top: '45px',
        width: '650px !important',
        height: props => props.noResultsFound ? '250px' :(props.searchQuery === '' ? '160px' : '540px'),
    },
}));

const Text = styled.span`
  font-family: Raleway, serif;
  color: ${props => props.color || colors.brand};
  font-weight: 600;
  font-size: ${props => props.fs || '12px'};
`;

const StyledH1 = styled.h1`
  font-family: "MADE Mirage Regular", serif;
  color: ${colors.black1};
  font-weight: 400;
  font-size: ${props => props.fs || '24px'};
  text-align: center;
`;

// const BookingsFilter = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 30px;
// `;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const GlobalSearch = ({open, handleClose}) => {
    const [noResultsFound, setNoResultsFound] = useState(false);
    const {searchQuery, searchResponse} = useSelector(globalSearchSelector);
    const classes = useStyles({noResultsFound, searchQuery});
    const dispatch = useDispatch();

    const {bookings, suppliers} = searchResponse || {};

    const onChangeHandler = (e) => {
        dispatch(setSearchQuery(e.target.value))
    }

    const clearSearchQuery = () => {
        dispatch(clearGlobalSearch());
    }

    // const searchOnlyBookingsFilter = () => {
    //     dispatch(setOnlyBookings());
    // }

    useEffect(() => {
        if (searchQuery !== '' && bookings?.length === 0) {
            setNoResultsFound(true);
        } else {
            setNoResultsFound(false);
        }
    }, [bookings?.length, searchQuery]);

    useEffect(() => {
        if (searchQuery !== '') {
            debounce(dispatch(globalSearch(searchQuery)), 1000);
        }
    }, [dispatch, searchQuery]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="global-search-title"
            aria-describedby="global-search-description"
            classes={{paper: classes.paper}}
        >
            <DialogTitle onClose={handleClose}>
                <Typography
                    variant="h3"
                    component={'div'}
                    style={{color: `${colors.black1}`, letterSpacing: '0px', margin: '20px 0 5px 30px'}}
                >
                    Global Search
                </Typography>
            </DialogTitle>
            <DialogContent classes={{root: classes.rootDialogContent}} className={classes.dialogContent}>
                <SearchContainer>
                    <TextField
                        InputLabelProps={{shrink: true}}
                        fullWidth={true}
                        onChange={onChangeHandler}
                        value={searchQuery}
                        placeholder="Search for bookings, clients and suppliers..."
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton onClick={clearSearchQuery}>
                                        <Text>Clear result</Text>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        style={{padding: '10px 30px'}}
                    />
                    {/*<BookingsFilter>
                    {/*    <Text fs="14px" color={colors.black1}>*/}
                    {/*        BOOKING*/}
                    {/*    </Text>*/}
                    {/*    <IconButton onClick={searchOnlyBookingsFilter}>*/}
                    {/*        <Text>{onlyBookings ? 'Only search bookings' : 'Search globally'}</Text>*/}
                    {/*    </IconButton>*/}
                    {/*</BookingsFilter>*/}
                </SearchContainer>
                {noResultsFound
                    ? <StyledH1>No results found</StyledH1>
                    : <SearchList bookings={bookings} suppliers={suppliers}/>
                }
            </DialogContent>
        </Dialog>
    );
}

export default GlobalSearch;