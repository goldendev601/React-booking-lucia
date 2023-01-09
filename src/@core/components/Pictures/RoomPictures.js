import React, { useCallback, useEffect, useState } from "react";
import { addItineraryStyles } from "styles";
import {
    Picture,
    UploadPicture,
    ItineraryFormContainer,
    Loading
} from "@core/components";
import {
    itinerariesSelector,
} from "redux/features/itineraries/itinerariesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRoomPictureUploadOpen } from "redux/features/dialogForms/dialogFormsOpenStateSlice";
import { bookingsSelector, setEditIndex, getItineraryBooking, removeRoomImage, removeImage, resetImages, setImage } from "redux/features/itineraries/bookings/bookingsSlice";
import { deleteHotelRoomImage } from "redux/features/rooms/roomsSlice";


const RoomPictures = ({ index, formik, name }) => {
    const classes = addItineraryStyles();
    const dispatch = useDispatch();
    const { booking, pendingImages, isFetching } = useSelector(bookingsSelector);
    // const { id } = booking || {};
    const { itineraryId } = useSelector(itinerariesSelector);

    const {
        hotelRooms
    } = booking || {}

    const [imageSrc, setImageSrc] = useState(null);

    const openPictureUpload = () => {
        dispatch(setEditIndex(index))
        dispatch(setRoomPictureUploadOpen(true));
    }

    const handlePictures = (imageFile, src) => {
        formik.setFieldValue(name, imageFile)
        setImageSrc(src);
    }

    const deleteImage = useCallback((index, id) => {
        dispatch(setEditIndex(index))
        dispatch(removeImage())
        dispatch(removeRoomImage())
        if (id) {
            const apiPayload = {
                itineraryId: itineraryId,
                bookingId: booking?.id,
                hotelRoomId: id,
            }
            dispatch(deleteHotelRoomImage(apiPayload));
            setTimeout(() => {
                const apiPayloadBooking = {
                    itineraryId: itineraryId,
                    bookingId: booking?.id,
                    bookingCategory: "hotels",
                }
                dispatch(getItineraryBooking(apiPayloadBooking));
                setImageSrc(null)
            }, 1000)
        }
    }, [booking?.id, dispatch, itineraryId]);

    useEffect(() => {
        setImageSrc("")
        if (hotelRooms && hotelRooms[index] && hotelRooms[index].imageUrl) {
            setImageSrc(hotelRooms[index].imageUrl)
        } 

        if (pendingImages && pendingImages.length > 0) {
            const pendingImage = pendingImages.find((pendingImage) => {
                return pendingImage.index === index
            })
            if (pendingImage && pendingImage.image) {
                setImageSrc(pendingImage.image.imageUrl)
                formik.setFieldValue(name, pendingImage.image.imageFile)
            }
        }
    }, [hotelRooms, pendingImages, index])

    // const edit = useMemo(() => {
    //     if (hotelRooms && hotelRooms[index]) {
    //         return !!hotelRooms[index].imageUrl
    //     }
    // }, [hotelRooms, index])

    // useEffect(() => {
    //     dispatch(resetImages());
    // }, [])

    return (
        <Loading isFetching={isFetching}>
            <ItineraryFormContainer>
                <div>
                    <div className={classes.pictures} style={{ flexGrow: '1' }}>
                        {imageSrc ? (
                            <Picture
                                id={(hotelRooms && hotelRooms[index]) ? hotelRooms[index].id : ''}
                                imageSrc={imageSrc}
                                openPictureUpload={() => openPictureUpload()}
                                deleteImage={deleteImage}
                            />
                        ) : (
                            <UploadPicture openPictureUpload={() => openPictureUpload()}
                                handlePictures={handlePictures} />
                        )}
                    </div>

                </div>
            </ItineraryFormContainer>
        </Loading >
    );
}

export default RoomPictures;
