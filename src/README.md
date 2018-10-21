# Find Venues Web App

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




#Purpose

The **Find Venues** app queries a large database for any businesses, points of interest, etc. near a user entered location.  Venues may be sought by name, keyword, and category.  Locations near which users are seeking the venue, may be entered as a street address, city, or the user's "Current Location".  Additional filtering available is "search radius" and "number of venues desired", the use of which will speed up searches.


#Requirements and Limitations

Devices from smartphones through wide screen desktops are supported.  Some features are limited on mobile devices.


#Installation

* Load the application files into the directory of your choice.
* npm is required, so install it if you don't already have it.  See npmjs.com.
* cd to the directory you installed the application in
* Enter each of the following commands at the command prompt.  (Also use npm to install any dependencies requested as you execute the below listed installs.)
  - npm install --save react
  - npm install --save react-google-maps
  - npm install --save react-dom
  - npm install --save prop-types
  - npm install --save semantic-ui-react


#Use

    #Begin

    Begin execution by entering localhost:3000 into your browser url field and hitting Enter..

    #Quick Searching

    In the first entry field, enter one of:
        *business name, point of interest, hospital name, etc., or
        *keywords, e.g., grill, pizza, etc., or
        *category, e.g., category:gas, category:bar, etc.

    In the second entry field (location), enter a street address or a city, state abbreviation.  You may also click on ![location pointer](./public/location-pointer.png) which will load "Current Location" into the field.

    Click on the blue search button.

    #Limiting Search Results

    **NOTE**:  These features are not implemented on mobile devices.

    The number of search results can be limited by shrinking the serach radius and/or by expressing the maximum number that may be returnes.

    Search radius defaults to 6.2 miles (10 kilometers).  Enter any value less than 6.2.

    Maximum count defaults to 30.  You may enter up to 50 or down to 1.

    #Results Modes

    The returned information may either be displayed on a map or as a list.  Click the **Show Map** checkbox to display in map mode.  A check mark indicates that the map will display.  Unclick the **Show Map** check box to display the results in a list.  In this case the checkbox will be blank or unchecked.

    You may check or uncheck this box at any time, either before or after a search.  If the results are already displayed when you click it, it will display the same results in the other mode.

    #Navigation and Selection Keys

    Tabbing may be used in the header settings section and the search section to move from field to field.  It is available whether or not accessibility is turned on.  Tabbing is also available to navigate through the venue list section.

    The Space Bar may be used to trigger the "current location" point icon as well as to set and unset the "show map" checkbox.

    The Enter key is available for triggering the "current location" point icon, the search button, the detail screen from the venue list and the venue detail screen close button..

    Up and Down Arrow keys may be used when navigating through the venue list.  Using the Up Arrow key from the first element wraps to the last element and vice versa with the Down Arrow key.


#Accessibility

Google Maps provides no accessibility for location markers.  As an alternative the Venue Finder Web App provides a listing of venues which are accessible via tab and Up and Down Arrow keys.

Button presses are accessible by using the Enter key.  The Show Map checkbox can be controlled through the space bar.

#Resources

In addition to the packages mentioned in the [Installation](#installation) section, the below listed packages were used.

React-google-maps was used to create a custom component called Infobox.  Infobox replaces google-maps' InfoWindow.

The Facebook create-react-app package was used to seed the initial project skeleton.