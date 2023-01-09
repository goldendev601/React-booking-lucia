import React from "react";
import Card from "./Card";
import SupplierCard from "./SupplierCard";

const SearchList = ({bookings, suppliers}) => {
    return (
        <>
            <React.Fragment>
                {bookings && bookings.map((booking) => {
                    return <Card key={booking.id}
                        id={booking?.id}
                        title={booking?.title}
                        client={booking?.client}
                        start={booking?.start}
                        end={booking?.end}
                        status={booking?.status}
                        />
                })}
            </React.Fragment>
            <React.Fragment>
                {suppliers && suppliers.map((supplier) => {
                    return <SupplierCard key={supplier.id}
                        id={supplier?.id}
                        bookingCategory={supplier?.bookingCategory}
                        name={supplier?.name}
                        address={supplier?.address}
                    />
                })}
            </React.Fragment>
        </>
    );
}

export default SearchList;