/* global google */
import React, {Component} from 'react'
import {Marker} from 'react-google-maps'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import PropTypes from 'prop-types'
import './VenueMarker.css'

class VenueMarker extends Component {

	static propTypes = {
		venue: PropTypes.object.isRequired,
		closestVenue: PropTypes.object.isRequired,
		venueIdToHilite: PropTypes.string.isRequired
	}

	state = {
		isOpen: false,
		activeMarker: this.props.activeMarker,
		activeMarkerColor: this.props.activeMarkerColor
	}

	componentWillReceiveProps(nextProps) {
		this.setState({activeMarker: nextProps.activeMarker,
									 activeMarkerColor: nextProps.activeMarkerColor})
	}

	toggleOpen = () => {
		this.setState(prevstate => {
			return {isOpen: !prevstate.isOpen}
		},
		() => {
			console.log("Venue State 'isOpen' updated to ", this.state.isOpen)
			if (!this.state.isOpen) {
				this.setState({activeMarker: false}, () => {
					console.log("Venue State 'activeMarker' updated to ", this.state.activeMarker)
					this.props.closeMarkers(null)
				})
			} else {
				console.log("Venue prop 'closeMarkers' executed for uid ", this.props.uid)
				this.props.closeMarkers(this.props.uid)
			}
		}
		)
	}

	render() {
		const {toggleOpen} = this
		const {isOpen, activeMarker, activeMarkerColor} = this.state
		const {venue, className, closestVenue, venueIdToHilite} = this.props
		const formattedAddress = (venue.location.formattedAddress.length === 1 ? venue.location.formattedAddress[0] :
															(venue.location.formattedAddress.length === 2 ? venue.location.formattedAddress[0] + ', ' + venue.location.formattedAddress[1] :
															venue.location.formattedAddress[0] + ', ' + venue.location.formattedAddress[1] + ', ' + venue.location.formattedAddress[2]))
		const infoBoxText = venue.name +
			 									'\n' + formattedAddress +
			 									'\n' + ( venue.categories[0] ? venue.categories[0].name : '        ' ) +
			 									'\nlat: ' + this.props.venue.location.labeledLatLngs[0].lat + ', \nlng: ' +
												this.props.venue.location.labeledLatLngs[0].lng
		return (
			<div>
				<Marker className={ className }
								position={ venue.location }
								onClick={ toggleOpen }
								animation={ (isOpen || venueIdToHilite === venue.id) && google.maps.Animation.BOUNCE }
								icon={ venueIdToHilite === venue.id ?
											 	{url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'} :
											 (activeMarker ?
												{url: activeMarkerColor} :
											 (closestVenue.id === venue.id ?
												{url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'} :
												{url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
											 ))
										 }
				>
				{ isOpen && activeMarker ?
						<InfoBox
		 					onCloseClick={ toggleOpen }
		 					options={ {closeBoxURL: '', enableEventPropagation: true} }
	 					>
			 				<div style={ {backgroundColor: 'yellow', opacity: 0.75, padding: '12px'} }>
			 					<div style={ {fontsize: '16px', fontColor: '#08233B'} } className='linebreak'>
									{ infoBoxText }
			 					</div>
			 				</div>
			 			</InfoBox> : null }
		 		</Marker>
			</div>
		)
	}

}

export default VenueMarker