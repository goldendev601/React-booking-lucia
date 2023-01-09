import React, {useEffect} from "react";
import {StepByStepDialog} from "@core/components";
import {createInsuranceTabsDock} from "./insuranceTabsDock";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    addItineraryBooking,
    bookingsSelector,
    updateItineraryBooking
} from "redux/features/itineraries/bookings/bookingsSlice";
import {useFormik} from "formik";
import {convertDate, removeProperty, snakeNestedKeys, dateToMyDate} from "utils";

const notesFieldNames = ['notes', 'cancellationPolicy'];

const validationSchema = yup.object({
    providerName: yup
        .string('Enter insurance name')
        .required('insurance name is required'),
    company: yup
        .string('Enter company name')
        .required('company name is required'),
    effectiveDate: yup
        .string('Select effective date')
        .required('effective date is required'),
    [notesFieldNames[0]]: yup
        .string(`Enter ${[notesFieldNames[0]]}`),
    [notesFieldNames[1]]: yup
        .string(`Enter ${[notesFieldNames[1]]}`),
});

const AddInsurance = ({...props}) => {
    const dispatch = useDispatch();
    const {startDate, booking} = useSelector(bookingsSelector);
    const {edit, apiPayload} = props;

    const {
        company,
        confirmationReference,
        policyType,
        effectiveDate,
        payment,
        price,
        insuranceSupplier,
        customHeaderTitle
    } = booking || {};

    const {name, saveToLibrary, address, email, phone, website} = insuranceSupplier || {};

    const {notes, cancelPolicy, description} = booking || {};

    const formik = useFormik({
        initialValues: {
            providerName: '',
            company: '',
            customHeaderTitle: 'Trip Insurance Details',
            effectiveDate: '',
            price: '',
            payment: '',
            confirmationReference: '',
            policyType: '',
            saveToLibrary: true,
            providerAddress: '',
            providerPhone: '',
            providerWebsite: '',
            providerEmail: '',
            [notesFieldNames[0]]: '',
            [notesFieldNames[1]]: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let data = {...values};
            data.effectiveDate = convertDate(data.effectiveDate);
            data.providerPhone = data.providerPhone.replace(/\s/g, "");

            if (data.price === '' || data.price === null) {
                data = removeProperty('price', data);
            }

            const payload = {...apiPayload};

            if (edit) {
                payload.data = snakeNestedKeys(data);
                dispatch(updateItineraryBooking(payload));
            } else {
                payload.data = snakeNestedKeys(data);
                dispatch(addItineraryBooking(payload));
            }
        }
    });

    useEffect(() => {
        if (edit) {
            const phoneNumber = "+" + phone?.replace(/\D+/g, '');
            formik.setValues({
                providerName: name,
                company: company,
                // customHeaderTitle: customHeaderTitle,
                customHeaderTitle: 'Trip Insurance Details',
                effectiveDate: new Date(effectiveDate),
                price: price,
                payment: payment,
                confirmationReference: confirmationReference,
                policyType: policyType,
                saveToLibrary: saveToLibrary,
                providerAddress: address,
                providerPhone: phone ? phoneNumber : '',
                providerWebsite: website,
                providerEmail: email,
                [notesFieldNames[0]]: notes,
                [notesFieldNames[1]]: cancelPolicy || description,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, booking, cancelPolicy, company, confirmationReference, description, edit, effectiveDate, email, name, notes, payment, phone, policyType, price, saveToLibrary, website]);

    useEffect(() => {
        if (startDate) {
            formik.setFieldValue('effectiveDate', dateToMyDate(startDate));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate]);

    return (
        <form id="insurances" onSubmit={formik.handleSubmit}>
            <StepByStepDialog
                description="Add Insurance"
                id="add-insurance"
                createTabsDock={createInsuranceTabsDock}
                {...props}
                formik={formik}
                unlockTabs={true}
            />
        </form>
    )
}


export default AddInsurance;
