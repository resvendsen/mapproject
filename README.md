# mapproject

# Venue Finder Web App

## Table of Contents

* [Purpose](#purpose)
* [Requirements and Limitations](#requirements-and-limitations)
* [Installation](#installation)
* [Use](#use)
  - [Begin](#begin)
  - [Quick Searching](#quick-searching)
  - [Limiting Search Results](#limiting-search-results)
  - [Results Modes](#results-modes)
  - [Navigation and Selection Keys](#navigation-and-selection-keys)
* [Accessibility](#accessibility)
* [Offline Use](#offline-use)
* [Resources](#resources)
* [Contributing](#contributing)
* [Future](#future)


# Purpose

The **Venue Finder** app queries the Foursquare database for any businesses, points of interest, etc. near a user entered location.  Venues may be sought by name, keyword, or category.  Locations near which users are seeking the venue, may be entered as a street address, city, or the user's "Current Location".  Additional filtering available is "search radius" and "number of venues desired", the use of which will speed up searches.


# Requirements

Devices from smartphones through wide screen desktops are supported.


# Installation

* At command prompt create a directory in which to store the app.
* cd to the directory you just created
* At command prompt: `git clone https://github.com/resvendsen/mapproject.git`
* npm is required, so install it if you don't already have it.  See npmjs.com.
* cd to the directory you installed the application in
* Enter each of the following commands at the command prompt.  (Also use npm to install any dependencies requested as you execute the below listed installs.)
  - `npm install --save react`
  - `npm install --save react-google-maps`
  - `npm install --save react-dom`
  - `npm install --save prop-types`
  - `npm install --save semantic-ui-react`
  - `npm install --save-dev cross-env`

  for production mode, additionally perform:
  - `npm install -g serve`


# Use

#### Begin

##### *Development mode*
    At the command prompt cd into the directory in which you installed the application and type `npm start` followed by Enter.

    The application should come up in your browser.
    If not, begin execution by entering `localhost:3000` into your browser url field and hitting Enter.

##### *Production mode*
    cd to the directory in which you installed the app
    -`npm run build`
    -`serve -s build`
    Enter `localhost:5000` into your browser url field and hit Enter.


#### Quick Searching
    In the first entry field, enter one of:
        * business name, point of interest, hospital name, etc., or
        * keywords, e.g., grill, pizza, etc., or
        * category, e.g., category:gas, category:bar, etc.

    In the second entry field (location), enter a street address or a city, state abbreviation.  You may also click on ![location pointer](./public/location-pointer.png) which will load "Current Location" into the field.

    Click on the blue search button.

#### Limiting Search Results
    **NOTE**:  These features are not implemented on mobile devices.

    The number of search results can be limited by shrinking the search radius and/or by expressing the maximum number that can be returned.

    Search radius defaults to 6.2 miles (10 kilometers).  Enter any value less than 62.0.

    Maximum count defaults to 30 (5 on mobile devices.  You may enter from 1 to 50 (15 on mobile devices).  Results will potentially be returned quicker for lower numbers.

#### Results Modes
    The returned information may either be displayed on a map or as a list.  Click the "Show Map" checkbox to display in map mode.  A check mark indicates that the map will display.  Unclick the "Show Map" check box to display the results in a list.  In this case the checkbox will be blank/unchecked.

    You may check or uncheck this box at any time, either before or after a search.  If the results are already displayed when you click it, it will display the same results in the other mode.

#### Navigation and Selection Keys
    Tabbing may be used in the header settings section and the search section to move from field to field.  It is available whether or not accessibility is turned on.  Tabbing is also available to navigate through the venue list section.

    The Space Bar may be used to trigger the "current location" point icon as well as to set and unset the "show map" checkbox.

    The Enter key is available for triggering the "current location" point icon, the search button, the map view from with selected venue highlighted from the venue list, and the venue detail screen close button.

    The Esc key can be used on the venue list screen to view venue details for the selected venue item.

    Up and Down Arrow keys may be used when navigating through the venue list.  Using the Up Arrow key from the first element wraps to the last element and vice versa with the Down Arrow key.

    When the Venue List is displayed, clicking on one of the venues will cause the application to switch to "Show Map" mode, show the color of the desired marker to green and cause the marker to bounce.  Selecting the "Show Map" checkbox will return the app to the "List" mode with the selected venue highlighted.


# Accessibility

Google Maps provides no accessibility for map location markers.  As an alternative the Venue Finder Web App provides a listing of venues which are accessible via tab and Up/Down Arrow keys.

Button presses are accessible by using the the space bar or the Enter key (however, the Enter key is not available for the themes button).  The Show Map checkbox can be controlled through the space bar.


# Offline Use

The app runs offline when in production mode after sufficient use for caching to build up.


# Resources

In addition to the packages mentioned in the [Installation](#installation) section, the below listed packages were used.

React-google-maps was used to create a custom component called Infobox.  Infobox replaces google-maps' InfoWindow.

The Facebook create-react-app package was used to seed the initial project skeleton.

The alternate map theme, called "Fancy" in the app, is DemoFancyMapStyles.json from github.com/tomchentw/react-google-maps/src/components/addons.

Foursquare.com is used as the source database for finding venues.  It also provides detailed information for each venue.

Google Maps is the source for rendering maps and markers.  Google Maps Geocoder provide the latitude and longitude for the actual location of the device requesting the search information.


# Contributing

Contributions are not currently accepted.


# Future

- [] Implement ToDo's in the code.
- [] Add a "clear" button to clear the input fields on the screen.
- [] Re-insert 'Themes" label which works but was removed because it
     genereates a warning.
- [] Implement Traveling Salesman heuristic which produces a route list and mappped display with multiple warehouses and vehicles available for delivery.
- [] Extend the above by providing Google Maps photos of the addresses on the delivery list.


# mapproject
