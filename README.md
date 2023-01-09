# Lucia react app

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**


# Added Workflow for Auto Deploy

# Project structure

src directory consists of following directories:

- @core: components that are used in the application
- mocks: mock data for dashboards
- api  
    - api.js: all endpoints used in the application are located here
    - axios.js: axios instance with embedded base url(from .env)
- assets: all logos/icons are used in application located here
- components: some components that are doesn't belong to @core directory
- hooks: some custom hooks that were used in the application
- pages: here are all the main pages and components that relate to these pages
  - Auth: auth pages(account approval; recovery form, sign in, sign up, term of services modal)
  - Calendar: calendar page
  - ItineraryDashboard: itinerary dashboard(dashboard component and columns)
  - SuppliersDashboard: suppliers dashboard(dashboard component and columns)
  - TravelersDashboard: travelers dashboard(dashboard component and columns)
  - Profile: all tabs related to profile information
  - Itinerary: all modals/dialogs windows and tabs related to creation of itinerary and bookings; itinerary details page(/itinerary-details); public itinerary page(/public/itinerary/SHARE-CODE)
- redux: consists of actions(not used) and features directories(followed to the "ducks" file structure)
- routes: all routes are located here; feature with the ability to impersonate the user
- styles: commonly used styles(material ui styles: theme, etc.; snackbar styles, colors object)

App.js: here are located interceptor for injecting access token; interceptor for handling 401 error

utils.js: file consists of utilities functions that are used across the application

.env: base url and unsplash token

- To create dialog/modal window with tabs use StepByStepDialog component(@core/components) and pass as prop createTabsDock={createTabsDockFunction}
  - createTabsDockFunction returns object, where key is name of the tab and value is the component(some props not used due to rewriting)
- Application is using formik library to handle form changes
- D&D(pages/Itinerary/ItineraryDetails/ItineraryDetails/BookingList) is implemented using react-beautiful-dnd

