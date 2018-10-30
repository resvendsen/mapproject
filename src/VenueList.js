import React, {Component} from 'react'
import {Image, Modal, Header, Button, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './VenueList.css'
import {incr, decr} from './utils'

class VenueList extends Component {
	static propTypes = {
		venues: PropTypes.array.isRequired
	}

	state = {
		detailOpen: Array(this.props.venues.length).fill(false)
	}

	// open modal
	handleOpen = (index) => {
		this.setState((prevstate) => {
			const tmpDetailOpen = prevstate['detailOpen']
			tmpDetailOpen[index] = !tmpDetailOpen[index]
			return { tmpDetailOpen }
		},
			() => console.log("State variable detailOpen set to 'Open', value: ", this.state.detailOpen[index])
		)
	}

	// close modal
	handleClose = (index) => {
		this.setState((prevstate) => {
			const tmpDetailOpen = prevstate['detailOpen']
			tmpDetailOpen[index] = !tmpDetailOpen[index]
			return { tmpDetailOpen }
		},
			() => console.log("State variable detailOpen set to 'Close', value: ", this.state.detailOpen[index])
		)
		// be sure the focus is set to the original list item which triggered the modal
		document.getElementById(index.toString(10)).focus()
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

	// UP/DOWN ARROWs only apply to navigating the venuelist
	// Enter may be used to trigger a detailed information modal based on the selected venuelist item
	// this function serves to limit the arrow keys to the underlying venuelist only
	navigateList = (key, i) => {
		switch (key) {
			case 'ArrowUp':
				// prevent arrow keys from being available when modal is open
				if (this.state.detailOpen[i]) {return}
				document.getElementById(decr(i, 1, this.props.venues.length).toString(10)).focus()
				console.log('NavigateList UP ARROW pressed')
				break
			case 'ArrowDown':
				// prevent arrow keys from being available when modal is open
				if (this.state.detailOpen[i]) {return}
				document.getElementById(incr(i, 1, this.props.venues.length).toString(10)).focus()
				console.log('NavigateList DOWN ARROW pressed')
				break
			case 'Enter':
				// allow Enter inside the modal for triggering the close button
				this.handleOpen(i)
				break
			default:
				break
		}
	}

	render() {
		const {handleOpen, handleClose, navigateList} = this
		const {detailOpen} = this.state
		const closestVenue = this.closestVenue()
// TODO implement various sorted lists
//		const sortedVenuesByDistance = this.props.venues.sort((v1, v2) => v1.location.distance - v2.location.distance)
		const sortedVenues = this.props.venues.sort((v1, v2) => ( v1.name < v2.name ? -1 : (v1.name > v2.name ? 1 : (v1.location.distance - v2.location.distance))))
		return (
			/* because each item on the venuelist may be selected, in order to display the venue's detailed information, the construction below is
			 * somewhat contorted.  the sorted venues are used to develop each modal and its associated trigger, an <li> tag.  The indices of these are
			 * used to set the appropriate state variable.  */
			<ul className="list-columns">
			{/* venues are sorted alphabetically, then by distance */}
			{ sortedVenues.map((venue, i) => {
				return (
					<Modal key={ i }
		        trigger={
							<li id={ i } className='container' onClick={ () => handleOpen(i) } onKeyDown={ (e) => navigateList(e.key, i) } tabIndex="0" style={ {whiteSpace: 'nowrap'} }>
								{ venue.id === closestVenue.id ?
									<Image src='http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' alt='yellow marker' verticalAlign='middle' size='mini' />
								:
									<Image src='http://maps.google.com/mapfiles/ms/icons/blue-dot.png' alt='blue marker' verticalAlign='middle' size='mini' />
								}
								<div className='box venue-info'><span style={ {width: '30.5vw', overflow: 'hidden'} }>{ venue.name }</span></div>
								<div className='box venue-info'><span>{ (venue.location.distance * 0.000621371).toFixed(1) }mi</span></div>
							</li>
						}
		        open={ detailOpen[i] }
		        basic
		        size='small'
		      >
		    		{ venue.id === closestVenue.id ?
							<Image src='http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' alt='yellow marker' verticalAlign='middle' size='mini' />
						:
							<Image src='http://maps.google.com/mapfiles/ms/icons/blue-dot.png' alt='blue marker' verticalAlign='middle' size='mini' />
						}
			      <Header content={ venue.name } />
			        <Modal.Content>
			          { venue.name }<br/>
								{ venue.location.formattedAddress.length === 1 ? venue.location.formattedAddress[0] :
																	(venue.location.formattedAddress.length === 2 ? venue.location.formattedAddress[0] + ', ' + venue.location.formattedAddress[1] :
																	venue.location.formattedAddress[0] + ', ' + venue.location.formattedAddress[1] + ', ' + venue.location.formattedAddress[2])

								 }<br/>
								{	( venue.categories[0] ? venue.categories[0].name : '        ' ) }<br/>
								{ (venue.location.distance * 0.000621371).toFixed(1) }mi  { (venue.location.distance / 1000).toFixed(2) }km<br/>
								{ 'lat: ' + venue.location.labeledLatLngs[0].lat + ', lng: ' + venue.location.labeledLatLngs[0].lng }
			        </Modal.Content>
			        <Modal.Actions>
			          <Button color='red' onClick={ () => handleClose(i) } inverted>
			            <Icon name='checkmark' /> Close
			          </Button>
			        </Modal.Actions>
	      	</Modal>
				)
			})}
			</ul>
		)
	}

}

export default VenueList
