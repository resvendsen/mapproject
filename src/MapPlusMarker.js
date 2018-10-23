/* global google */
import React, {Component} from 'react'
import {Marker} from "react-google-maps"
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import VenueMarker from './VenueMarker'
import MapWrap from './MapWrap'
import './MapPlusMarker.css'
import PropTypes from 'prop-types'
// from github.com/tomchentw/react-google-maps/src/components/addons/InfoBox.md dtd 3Nov17
import DemoFancyMapStyles from './demoFancyMapStyles.json'

class MapPlusMarker extends Component {
	static propTypes = {
		venues: PropTypes.array.isRequired,
		accessibility: PropTypes.bool.isRequired,
		theme: PropTypes.string.isRequired
	}

	state = {
		isOpen: false
	}

	closestVenue = () => {
		let cV = this.props.venues[0]
	  this.props.venues.forEach(venue => {
			if (venue.location.distance < cV.location.distance) {
					cV = venue
			}
		})
		return cV
	}

	toggleOpen = () => {
		this.setState(prevstate => {
			return {isOpen: !prevstate.isOpen}
		},
		() => console.log('MpM State isOpen updated to ', this.state.isOpen)
		)
	}

	render() {
		const {theme} = this.props
		const {isOpen} = this.state
		const infoBoxText = 'Current Location\n' +
												'lat: ' + this.props.curPosition.lat + ', lng: ' +
												this.props.curPosition.lng +
			 									'\n' + this.props.curAddress
		const closestVenue = this.closestVenue()
		const fancyTheme = (theme === 'fancy')
		return (
			<MapWrap
				defaultZoom={ 12 }
				center={ {lat: parseFloat(this.props.curPosition.lat), lng: parseFloat(this.props.curPosition.lng)} }
				{ ...this.props }
				options={ fancyTheme ? {styles: DemoFancyMapStyles} : {styles: null} }
			>
			{/* this marks the location chosen on the search screen */}
	 		{ this.props.showCurMarker &&
	 			<Marker className='curposmarker'
	 							position={ {lat: parseFloat(this.props.curPosition.lat), lng: parseFloat(this.props.curPosition.lng)} }
	 							onClick={ this.toggleOpen }
	 							animation={ isOpen && google.maps.Animation.BOUNCE }
	 			>
	 				{ isOpen && <InfoBox
		 					onCloseClick={ this.toggleOpen }
		 					options={ {closeBoxURL: '', enableEventPropagation: true, label: 'H'} }
		 					>
				 				<div style={ {backgroundColor: 'yellow', opacity: 0.75, padding: '12px'} }>
				 					<div style={ {fontsize: '16px', fontColor: '#08233B'} } className='linebreak'>
				 						{ infoBoxText }
				 					</div>
				 				</div>
			 			</InfoBox> }
			 	</Marker>
			}
			{/* these mark the locations of the venues searched for */}
			{ this.props.venues.map((venue, idx) => {
					let marker = <VenueMarker
			                    key={ venue.id }
			                    uid={ venue.id }
			                    venue={ venue }
			                    className={ 'venue-' + idx }
			                    closestVenue={ closestVenue }
			                    curPosition={ this.props.curPosition }
			  									closestMarker={ this.props.closestMarker }
			  									activeMarker={ venue.id === this.props.activeMarker ? true : false }
			  									activeMarkerColor={ this.props.activeMarkerColor }
			  									closeMarkers={ this.props.closeOtherMarkers }
			                 />
			    return marker
				})
			}
			</MapWrap>
		)
	}

}

export default MapPlusMarker