import React, {Component} from 'react'
import MapContainer from './MapContainer'
import VenueList from './VenueList'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import PropTypes from 'prop-types'
import './App.css'


class Home extends Component {
	static propTypes = {
		searchRadius: PropTypes.number.isRequired,
		maxReturnCount: PropTypes.number.isRequired,
		setSearchRadius: PropTypes.func.isRequired,
		setReturnCount: PropTypes.func.isRequired,
		showMap: PropTypes.bool.isRequired,
		toggleShowMap: PropTypes.func.isRequired,
		accessibility: PropTypes.bool.isRequired,
		theme: PropTypes.string.isRequired
	}

	state = {
		curPosition: {},
		curAddress: '',
		searchLoc: '',
		searchReq: '',
		distance: '',
		showCurMarker: true,
		venues: []
	}

	defaultLocation = {lat: 39.984929, lng: -85.983967}

	/* geocoding is based on gist.github.com/joyrexus/README.md viz. geocoding your location */
	geocode = (lat, lng) => {
		console.log('IN GEOCODE')
		let formatted_address
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          formatted_address = results[0].formatted_address;
        } else {
          alert('No results found.  Try changing the search criteria');
        }
        if (latlng) {
        	if (formatted_address) {
        		this.setState({'curPosition': {'lat': lat, 'lng': lng}, 'curAddress': formatted_address},
        			() => {console.log('Current Position set: lat: '+lat+', lng: '+lng)
        						 console.log('Current Address set: '+formatted_address)})
        	} else {
        		this.setState((state) => ({'curPosition': {'lat': lat, 'lng': lng}, 'curAddress': ''}),
        			() => {console.log('Current Position set: lat: '+lat+', lng: '+lng)
        						 console.log('Current Address set: ')})
        	}
        } else {
        	alert('Could not find current position.  Please contact programmer')
        }
      } else {
        alert('Geocoder failed due to: ' + status + '.  Please contact programmer');
      }
    });
  }

// Use Foursquare.com to get venue information based on location
  setPosition = (pos) => {
  		let fetchStr
  		this.setState(
  			{curPosition: {lat: pos.coords.latitude, lng: pos.coords.longitude}},
  			() => {
	  			this.geocode(pos.coords.latitude, pos.coords.longitude)
	  			fetchStr = 'https://api.foursquare.com/v2/venues/search?' +
												'client_id=SRCXFDXD344BX4AUT1GXRBRQ0ZL1PVVDHRLUW4HHG5J5SM5W' +
												'&client_secret=5ATS5W33BNLLXINUKIM4QCQOI1A4BPL0PYO1DN4XYA3GYJEW' +
												'&v=20180826' +
												'&ll=' + this.state.curPosition.lat + ',' + this.state.curPosition.lng +
												'&radius=' + this.props.searchRadius.toFixed(6) +
												'&query=' + this.state.searchReq + '&limit=' + this.props.maxReturnCount.toFixed(0)
					console.log('fetch string: ', fetchStr)
					fetch(fetchStr)
						.then(res => res.json())
						.then(json => {
								console.log(JSON.stringify(json.response.venues))
								this.setState({venues: json.response.venues}, () => {
									console.log(this.state.venues.length + ' ' + this.state.searchReq + ' venues retrieved')
								})
						})
						.catch((e) => {
								console.log(e)
								alert('*** Error fetching venues.  Please contact programmer. ***')
						})
  			}
  		)
  }

	getLocation() {
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition(this.setPosition);
		} else {
			alert("Geolocation is not supported by this browser. Please enter an address.")
		}
	}

	searchWithAddress = () => {
		const thus = this
		const geocoder = new window.google.maps.Geocoder()
		geocoder.geocode( {'address': this.state.searchLoc}, function(results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[0]) {
        	console.log(results[0].geometry.location.lat()+", "+results[0].geometry.location.lng())
        	thus.setPosition({coords: {latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng(), accuracy: 25}, timestamp: 0})
    }
		}
	})
	}

	handleSearch = values => {
		this.setState(
			{
				searchLoc: values.searchLoc,
				searchReq: values.searchReq
			},
			() => {
				if (this.state.searchLoc === "Current Location") {
					console.log('SEARCH CURRENT LOCATION')
					this.getLocation()
					console.log('state: '+this.state.curPosition.lat+', '+this.state.curPosition.lng)
				} else {
					this.searchWithAddress();
				}
			}
		)
	}

	render() {
		const {curPosition, curAddress, showCurMarker, venues} = this.state
		const {accessibility, theme} = this.props
		return(
			<div>
				<div style={{height: "17vh"}}>
					<SearchBar
						onSearch={ this.handleSearch }
					/>
					<NavBar { ...this.props } showMap={ this.props.showMap } toggleShowMap={ this.props.toggleShowMap }>
	        </NavBar>
	      </div>
	      { this.props.showMap ?
					<MapContainer className="my-map"
											 curPosition={ curPosition }
											 curAddress={ curAddress }
											 showCurMarker={ showCurMarker }
											 venues={ venues }
											 accessibility={ accessibility }
											 theme={ theme }
					/>
					:
					<VenueList venues={ this.state.venues } />
				}
			</div>
		)
	}
}

export default Home