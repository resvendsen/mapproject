import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MapPlusMarker from './MapPlusMarker'

class MapContainer extends Component {
	static propTypes = {
		curPosition: PropTypes.object.isRequired,
		curAddress: PropTypes.string.isRequired,
		showCurMarker: PropTypes.bool.isRequired,
		venues: PropTypes.array.isRequired,
		accessibility: PropTypes.bool.isRequired,
		theme: PropTypes.string.isRequired
	}

	state = {
		closestMarker: null,
		activeMarker: null,
		activeMarkerColor: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
	}

	closeOtherMarkers = (uid) => {
		this.setState({activeMarker: uid,
									 activeMarkerColor: (uid !== null ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : this.state.activeMarkerColor)})
	}

	render() {
		const {curPosition, curAddress, showCurMarker, venues, accessibility, theme} = this.props
		const {closestMarker, activeMarker, activeMarkerColor} = this.state
		const {closeOtherMarkers} = this
		return (
			<MapPlusMarker googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_ihMUES0em9FIiYLQqijFlVjS0qxRjzI&v=3.exp&libraries=geometry,drawing,places"
  									 loadingElement={ <div style={ {height: `100%`} } /> }
  									 containerElement={ <div style={ {height: `100vh`} } /> }
  									 mapElement={ <div style={ {height: `100%`} } /> }
  									 curPosition={ curPosition }
  									 curAddress={ curAddress }
  									 showCurMarker={ showCurMarker }
  									 venues={ venues }
  									 closestMarker={ closestMarker }
  									 activeMarker={ activeMarker }
  									 activeMarkerColor={ activeMarkerColor }
  									 closeOtherMarkers={ closeOtherMarkers }
  									 accessibility={ accessibility }
  									 theme={ theme }
  		/>
		)
	}
}

export default MapContainer