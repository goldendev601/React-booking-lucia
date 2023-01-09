//Access code endpoints
export const ACESS_CODE_VALIDATION = '/auth/registration-access-code/validate';

//Auth endpoints
export const IMPERSONATE = (impersonateToken) => `/auth/impersonate/${impersonateToken}`;
export const LOGIN = '/auth/login';
export const REGISTER = '/auth/register';
export const LOGOUT = '/auth/logout';
export const PASSWORD_RESET = '/auth/password/reset';
export const VALIDATE_RESET_TOKEN = '/auth/password/validate-reset-token';
export const UPDATE_PASSWORD = '/auth/password/update';
export const REFRESH_TOKEN = '/auth/refresh';

//payment methods
export const GET_PAYMENT_METHODS = '/agent/payment-methods/fetch';

// My requests
export const GET_MY_REQUESTS = '/agent/advisor-requests/advisor/requests';
export const GET_SELECTED_REQUEST = (advisorId) => `/agent/advisor-requests/chat/${advisorId}/request`;
export const DELETE_REQUEST = (advisorId) => `/agent/advisor-requests/advisor/${advisorId}/delete`;
export const MARK_COMPLETED = (advisorId) => `/agent/advisor-requests/chat/${advisorId}/mark-completed`;
export const SEND_MESSAGE = (advisorId) => `/agent/advisor-requests/chat/${advisorId}/send-message`;
export const SEND_FILE = (advisorId) => `/agent/advisor-requests/chat/${advisorId}/send-file`;
export const LIST_CHATS = (advisorId) => `/agent/advisor-requests/chat/${advisorId}`;
export const MARK_SEEN = (advisorId) => `/agent/advisor-requests/chat/${advisorId}/mark-seen`;
export const SUBMIT_FEEDBACK = (advisorId) => `/agent/advisor-requests/advisor/${advisorId}/submit-feedback`;
export const ADVISOR_REQUESTS_EXTEND_DEADLINE = (advisorId) => `/agent/advisor-requests/chat/${advisorId}/extend-deadline`;


//Advisor Requests
export const ADVISOR_REQUESTS_HIRE = `/agent/advisor-requests/advisor/hire`;
export const ADVISOR_REQUESTS_GET_NOTIFICATIONS = `/agent/advisor-requests/notifications`;
export const ADVISOR_REQUESTS_GET_CONCIERGES = `/agent/advisor-requests/concierges`;
export const ADVISOR_REQUESTS_APPLY_DISCOUNT = (advisorId) => `/agent/advisor-requests/advisor/${advisorId}/apply-discount`;
export const ADVISOR_REQUESTS_PAY_USING_INTENT = (advisorId) => `/agent/advisor-requests/advisor/${advisorId}/pay-using-intent`;
export const ADVISOR_REQUESTS_COMPLETE_INTENT_PAYMENT = (advisorId) => `/agent/advisor-requests/advisor/${advisorId}/complete-intent-payment`;
export const ADVISOR_REQUESTS_PAY_USING_STORED_PAYMENT = (advisorId) => `/agent/advisor-requests/advisor/${advisorId}/pay-using-stored-payment`;
export const ADVISOR_REQUESTS_GET_TOP_CONCIERGES = (limit) => `/agent/advisor-requests/top-concierges?limit=${limit}`;
export const ADVISOR_REQUESTS_GET_RECENT_REQUESTS = (limit) => `/agent/advisor-requests/recent-requests?limit=${limit}`;

//Global search endpoint
export const GLOBAL_SEARCH = (query) => `/agent/global-search?query=${query}`;

//Profile endpoints
export const UPDATE_PROFILE_PASSWORD = '/agent/profile/password/update';
export const UPDATE_PROFILE = '/agent/profile/update';
export const UPDATE_ITINERARY_DESIGN = 'agent/profile/update-itinerary-design';
export const GET_PROFILE = '/agent/profile';
export const BILLING_PORTAL = '/agent/license/billing-portal';

//Subscription
export const GET_SUBSCRIPTION_PRICES = '/constants/subscription-prices';
export const SUBSCRIBE = '/agent/license/subscribe-with-card';
export const GENERATE_CARD_TOKEN = '/agent/payment-methods/generate-token';
export const ADD_PAYMENT_METHOD = '/agent/payment-methods/add';
export const CHECKOUT = '/agent/license/checkout';

//Calendar endpoints
export const GET_EVENTS = () => '/agent/calendar/events?from=2001-01-01&to=2099-12-30';
export const BEGIN_GOOGLE_AUTH = '/auth/google-calendar/oauth';
export const COMPLETE_GOOGLE_AUTH = '/auth/google-calendar/oauth/callback'

//Suppliers endpoints
export const FETCH_SUPPLIERS = (start) => `/agent/suppliers?start=${start}&length=10&paginate=true`;
export const UPDATE_SUPPLIER = (supplierId) => `/agent/suppliers/${supplierId}/update`;
export const ADD_SUPPLIER = '/agent/suppliers/add';
export const DELETE_SUPPLIER = (supplierId) => `/agent/suppliers/${supplierId}/delete`;
export const SUPPLIER_LOOKUP = (search, bookingCategoryId) => `/agent/suppliers/look-up?search=${search}&booking_category_id=${bookingCategoryId}&detailed=false`;
export const ADD_SUPPLIER_PICTURES = (supplierId) => `/agent/suppliers/${supplierId}/pictures/add`;
export const GET_SUPPLIER_PICTURES = (supplierId) => `/agent/suppliers/${supplierId}/pictures`;
export const DELETE_SUPPLIER_PICTURE = (supplierId, supplierPictureId) => `/agent/suppliers/${supplierId}/pictures/${supplierPictureId}/delete`;
export const NOTES_LOOKUP = (search) => `/agent/notes/look-up?title=${search}`;
export const GOOGLE_PLACE_HOTEL_SEARCH = (placeId) => `/agent/suppliers/google-place-hotel-search?place_id=${placeId}&detailed=false`;

//Notes endpoints
export const FETCH_NOTES = (start) => `/agent/notes?start=${start}&length=10&paginate=true`;
export const AUTOCOMPLETE_NOTES = (search) => `agent/notes/auto-complete?title=${search}`;
export const DELETE_NOTE = (noteId) => `/agent/notes/${noteId}/delete`;
export const ADD_NOTE = '/agent/notes/add';
export const UPDATE_NOTE = (noteId) => `/agent/notes/${noteId}/update`;

//Travelers endpoints
export const FETCH_TRAVELERS = (start) => `/agent/travellers?start=${start}&length=10`;
export const FETCH_TRAVELER = (id) => `/agent/travellers/${id}/fetch`;
export const ADD_TRAVELER = `/agent/travellers/add`;
export const UPDATE_TRAVELER = (id) => `/agent/travellers/${id}/update`;
export const DELETE_TRAVELER = (id) => `/agent/travellers/${id}/delete`;
export const Add_TRAVELER_DOCUMENT = (id) => `/agent/travellers/${id}/documents/add`;

//Itineraries endpoints
export const FETCH_PACKED_ITINERARY = (itineraryId) => `/agent/itineraries/${itineraryId}/fetch?detailed=true&shared_view=true&packed_booking=true`;
export const FETCH_ITINERARIES = (start, past, active, upcoming) => `/agent/itineraries?start=${start}&length=10&paginate=true&show_past_itineraries=${past}&show_upcoming_itineraries=${upcoming}&show_active_itineraries=${active}`;
export const FETCH_ITINERARY = (id) => `/agent/itineraries/${id}/fetch?detailed=true&shared_view=true`;
export const FETCH_SHARED_ITINERARY = (shareCode) => `/shares/itineraries/${shareCode}`;
export const GET_SHARE_CODE = (id) => `/agent/itineraries/${id}/get-share-code`;
export const GET_ITINERARY_PASSENGERS = (itineraryId) => `/agent/itineraries/${itineraryId}/passengers`;
export const ADD_ITINERARY_PASSENGER = (itineraryId) => `/agent/itineraries/${itineraryId}/passengers/add`;
export const DELETE_ITINERARY_PASSENGER = (itineraryId, passengerId) => `/agent/itineraries/${itineraryId}/passengers/${passengerId}/delete`;
export const DELETE_SHARE_CODE = (id) => `/agent/itineraries/${id}/delete-share-code`;
export const ADD_ITINERARY = `/agent/itineraries/add`;
export const UPDATE_ITINERARY = (id) => `/agent/itineraries/${id}/update`;
export const Add_ITINERARY_DOCUMENT = (id) => `/agent/itineraries/${id}/documents/add`;
export const DELETE_ITINERARY_DOCUMENT = (id, documentId) => `/agent/itineraries/${id}/documents/${documentId}/delete`;
export const IMPORT_BOOKING = (id) => `/agent/itineraries/${id}/ocr/import`;
export const UPDATE_ITINERARY_PASSENGER = (itineraryId, passengerId) => `/agent/itineraries/${itineraryId}/passengers/${passengerId}/update`;
export const SET_ITINERARY_STATUS = (id) => `/agent/itineraries/${id}/set-status`;
export const DELETE_ITINERARY = (id) => `/agent/itineraries/${id}/delete`;
export const DELETE_ITINERARY_PICTURE = (itineraryId, pictureId) => `/agent/itineraries/${itineraryId}/pictures/${pictureId}/delete`;
export const GET_ITINERARY_PICTURES = (itineraryId) => `/agent/itineraries/${itineraryId}/pictures`;
export const ADD_ITINERARY_PICTURES = (id) => `/agent/itineraries/${id}/pictures/add`;
export const SEND_INVITATION = (id) => `/agent/itineraries/${id}/send-invitation`;
export const CLONE_ITINERARY = (id) => `/agent/itineraries/${id}/clone-itinerary`;
export const SEND_INVITATION_TO_CLIENT = (id) => `/agent/itineraries/${id}/send-invitation-to-client`;
export const UPDATE_ITINERARY_ABSTRACT = (itineraryId) => `/agent/itineraries/${itineraryId}/update/abstract`;
export const Add_ITINERARY_TASK = (id) => `/agent/itineraries/${id}/tasks/add`;
export const MARK_ITINERARY_TASK_COMPLETED = (itineraryId, taskId) => `/agent/itineraries/${itineraryId}/tasks/${taskId}/mark-completed`;
export const UPDATE_ITINERARY_LOGO = (itineraryId) => `/agent/itineraries/${itineraryId}/update/logo`;
export const UPDATE_ITINERARY_BOOKING_POSITION = (itineraryId) => `/agent/itineraries/${itineraryId}/update/booking-date`;

//Bookings
export const ADD_HOTEL_AMENITY = (itineraryId, bookingId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities/add`;
export const ITINERARY_BOOKINGS = (itineraryId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}`;
export const ITINERARY_BOOKING = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/fetch`;
export const ADD_ITINERARY_BOOKING = (itineraryId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/add`;
export const ADD_ITINERARY_BOOKING_DIVIDER = (itineraryId) => `/agent/itineraries/${itineraryId}/bookings/dividers/add`;
export const ADD_ITINERARY_BOOKING_HEADER = (itineraryId) => `/agent/itineraries/${itineraryId}/bookings/headers/add`;
export const UPDATE_ITINERARY_BOOKING = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/update`;
export const ADD_ITINERARY_BOOKING_PASSENGER = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/add`;
export const ADD_ITINERARY_BOOKING_CABIN = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/cabins/add`;
export const DELETE_ITINERARY_BOOKING = (itineraryId, otherId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${otherId}/delete`;
export const DUPLICATE_ITINERARY_BOOKING = (itineraryId) => `/agent/itineraries/${itineraryId}/bookings/duplicate`;
export const SHIFT_ITINERARY_BOOKING = (itineraryId) => `/agent/itineraries/${itineraryId}/bookings/shift`;
export const GET_BOOKING_PASSENGER = (itineraryId, bookingId, passengerId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/${passengerId}/fetch`;
export const GET_BOOKING_PASSENGERS = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers`;
export const GET_BOOKING_CABINS = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/cabins`;
export const GET_ITINERARY_BOOKING_PICTURES = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/pictures`;
export const DELETE_ITINERARY_BOOKING_PICTURE = (itineraryId, bookingId, pictureId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/pictures/${pictureId}/delete`;
export const UPDATE_ITINERARY_BOOKING_PASSENGER = (itineraryId, bookingId, passengerId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/${passengerId}/update`;
export const DELETE_ITINERARY_BOOKING_PASSENGER = (itineraryId, bookingId, passengerId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/passengers/${passengerId}/delete`;
export const UPDATE_ITINERARY_BOOKING_CABIN = (itineraryId, bookingId, cabinId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/cabins/${cabinId}/update`;
export const DELETE_ITINERARY_BOOKING_CABIN = (itineraryId, bookingId, cabinId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/cabins/${cabinId}/delete`;
export const GET_HOTEL_AMENITIES = (itineraryId, bookingId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities`;
export const UPDATE_HOTEL_AMENITY = (itineraryId, bookingId, hotelAmenityId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities/${hotelAmenityId}/update`;
export const DELETE_HOTEL_AMENITY = (itineraryId, bookingId, hotelAmenityId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/amenities/${hotelAmenityId}/delete`;
export const GET_BOOKING_SEGMENTS = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments`;
export const ADD_BOOKING_SEGMENT = (itineraryId, bookingId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments/add`;
export const UPDATE_BOOKING_SEGMENT = (itineraryId, bookingId, flightSegmentId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments/${flightSegmentId}/update`;
export const DELETE_BOOKING_SEGMENT = (itineraryId, bookingId, flightSegmentId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${bookingId}/segments/${flightSegmentId}/delete`;

export const ADD_ITINERARY_BOOKING_PICTURES = (itineraryId, otherId, bookingCategory) => `/agent/itineraries/${itineraryId}/bookings/${bookingCategory}/${otherId}/pictures/add`;

//Flights
export const SEARCH_FLIGHT_NUMBER = (itineraryId, flightNumber, departureDate) => `/agent/itineraries/${itineraryId}/bookings/flights/search-flight-number?flight_number=${flightNumber}&departure_date=${departureDate}`;
export const GET_FLIGHT_SEGMENT_DETAIL = (itineraryId, flightId, flightSegmentId) => `/agent/itineraries/${itineraryId}/bookings/flights/${flightId}/segments/${flightSegmentId}/fetch`;

//Rooms
export const GET_HOTEL_ROOMS = (itineraryId, bookingId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms`;
export const ADD_HOTEL_ROOM = (itineraryId, bookingId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/add`;
export const UPDATE_HOTEL_ROOM = (itineraryId, bookingId, hotelRoomId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/update`;
export const DELETE_HOTEL_ROOM = (itineraryId, bookingId, hotelRoomId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/delete`;
export const ADD_HOTEL_ROOM_IMAGE = (itineraryId, bookingId, hotelRoomId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/add-image`;
export const DELETE_HOTEL_ROOM_IMAGE = (itineraryId, bookingId, hotelRoomId) => `/agent/itineraries/${itineraryId}/bookings/hotels/${bookingId}/rooms/${hotelRoomId}/delete-image`;

//Constants
export const GET_CURRENCY_TYPES = '/constants/currency-types';
export const GET_AIRPORTS = '/constants/airports';
export const GET_BEDDING_TYPES = '/constants/bedding-types';
export const GET_BOOKING_CATEGORIES = '/constants/booking-category';
export const GET_AIRLINES = '/constants/airlines';
export const GET_AMENITIES = '/constants/amenities';
export const GET_ADVISOR_REQUEST_TYPES = '/constants/advisor-request-type';
export const GET_AGENCY_USAGE_MODE = '/constants/agency-usage-mode';
export const GET_AVATARS = '/constants/avatars';
export const FETCH_PROPERTY_DESIGNS = `/constants/property-design`;
