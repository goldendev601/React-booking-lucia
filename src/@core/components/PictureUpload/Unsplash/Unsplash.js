import React, {useEffect, useState} from "react";
import {ItineraryFormContainer} from "../../Containers";
// import {TextField} from "@core/components";
import {createApi} from "unsplash-js";
import {CircularProgress, Grid, TextField} from "@material-ui/core";
import styled from "styled-components";
import {toSnakeCase} from "utils";
import {useDispatch} from "react-redux";
import {setPicture} from "redux/features/pictures/picturesSlice";

const api = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
});

const StyledImg = styled.img`
  width: 250px;
  height: 200px;
  ${props => props.selected ? 'border: 5px solid #BA886E' : ''}
`;

const ImagesContainer = styled.div`
  margin-top: 20px;
`;

const PicturesContainer = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Errors = styled(SpinnerWrapper)`
`;

const UserCard = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  height: 20px;
  border-radius: 10px;
  background-color: #FBF8F3;
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  color: #3C3C3C;
  font-weight: 700;
`;

const UserProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-bottom: 6px;
`;

const PhotoComp = ({picture, handleClick, selected}) => {
    const {user, urls} = picture || {};
    const {profile_image, name} = user || {};
    return (
        <PicturesContainer>
            <StyledImg onClick={() => handleClick(picture)} className="img" src={urls.regular} alt="" selected={selected === picture}/>
            <UserCard>
                <UserProfileImage src={profile_image.small} alt=""/>
                <span style={{padding: '0 5px'}}>{name}</span>
            </UserCard>
        </PicturesContainer>
    );
};

const UnsplashPictures = ({formik, handleClick, selected}) => {
    const [data, setPhotosResponse] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setPage(prevState => prevState + 1);
        }
    }

    const fetchPictures = () => {
        setQuery(formik.values.query)
        api.search
            .getPhotos({query: formik.values.query, orientation: "landscape", page: page})
            .then(result => {
                if (result && result.response) {
                    setPhotosResponse(prevState => ([...prevState, ...result.response.results]));
                }
            })
            .catch((e) => {
                console.log("en error has occurred!", e);
            });
    }

    useEffect(() => {
        fetchPictures();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.query, page]);

    useEffect(() => {
        if (formik.values.query !== query) {
            setPhotosResponse([]);
        }
    }, [formik.values.query, query]);

    useEffect(() => {
        if (formik.values.url !== '') {
            formik.setFieldValue('url', '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.url]);

    if (data.length === 0 && formik.values.query !== '') {
        return (
            <SpinnerWrapper>
                <CircularProgress/>
            </SpinnerWrapper>
        );
    } else if (data.length === 0) {
        return null
    } else if (data.errors) {
        return (
            <Errors>
                <span>{data.errors[0]}</span>
            </Errors>
        );
    } else {
        return (
            <ImagesContainer>
                <Grid style={{
                    overflow: 'auto',
                    height: '420px'
                }} onScroll={handleScroll} container spacing={2}>
                    {data.map((image, index) => {
                        return (
                            <Grid item xs={4} key={index}>
                                <PhotoComp handleClick={handleClick} picture={image} selected={selected}/>
                            </Grid>);
                    })}
                </Grid>
            </ImagesContainer>
        );
    }
};

const Unsplash = ({formik}) => {
    const dispatch = useDispatch()
    const [imageFiles, setImageFiles] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null)
    const [query, setQuery] = useState('')

    const handleClick = (picture) => {
        if (picture) {
            setSelectedImage(picture)
            fetch(picture.urls.regular, {method: 'get',
               headers: new Headers({
                 'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
               })})
                .then(res => res.blob())
                .then((result) => {
                    const imageFile = new File([result], toSnakeCase(picture.alt_description ? picture.alt_description : ''), {type:'image/jpeg'});
                    const url = URL.createObjectURL(imageFile);
                    dispatch(setPicture({imageName: picture.id, imageUrl: url, imageFile: imageFile}));
                    setImageFiles(imageFile);
                });
        }
    }

    return (
        <ItineraryFormContainer>
            <TextField
                value={query}
                width="100%"
                label="Search picture in unsplash"
                placeholder="Enter the name"
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        formik.setFieldValue('query', query)
                    }
                }}
                InputLabelProps={{shrink: true}}
                fullWidth
            />
            <UnsplashPictures handleClick={handleClick} formik={formik} selected={selectedImage} />
        </ItineraryFormContainer>
    );
}

export default Unsplash;