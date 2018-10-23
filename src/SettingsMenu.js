import React, {Component} from 'react'
import {Menu, Button, Icon, Modal, Responsive} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './SettingsMenu.css'

// this deals with the Accessibility, Themes, and About buttons in the heading
class SettingsMenu extends Component {

	static propTypes = {
		setTheme: PropTypes.func.isRequired,
		theme: PropTypes.string.isRequired,
		toggleAccessibility: PropTypes.func.isRequired,
		accessibility: PropTypes.bool.isRequired,
		showMap: PropTypes.bool.isRequired,
		toggleShowMap: PropTypes.func.isRequired
	}

	state = {
		activeItem: 'accessibility',
		showAbout: false
	}

	toggleAboutPopup = () => {
		this.setState(prevstate => {
			return {showAbout: !prevstate.showAbout}
		},
			() => console.log('Show About set to ', this.state.showAbout)
		)
	}

	handleItemClick = (item) => {
		if (item === 'accessibility') {
			/* the map does no good unless you can see it -- at this time google maps does not allow tabindex for markers
			   so I'm turning it off here when 'accessibilty' is selected */
			if (!this.props.accessibility && this.props.showMap) {
				this.props.toggleShowMap()
			}
			this.props.toggleAccessibility()
			this.setState({ activeItem: item },
			()  => console.log("Settings active item changed to ", this.state.activeItem)
		)
		} else
		if (item === 'about') {
			this.toggleAboutPopup()
			this.setState({ activeItem: item },
			()  => console.log("Settings active item changed to ", this.state.activeItem)
		)
		} else {
			alert('*** Invalid button type pased to handleItemClick: ', item, '.  Please contact programmer ***')
		}
	}

	handleThemeChange = (e) => {
		this.props.setTheme(e.target.value)
	}

	render() {
		const {theme, accessibility} = this.props
		const {showAbout} = this.state
		const {handleItemClick, handleThemeChange, toggleAboutPopup} = this
		const greenstyle = {color: 'lightgreen', backgroundColor: '#222'}
		const plainstyle = {color: '#ddd', backgroundColor: '#222'}
		const notMobile = {minWidth: Responsive.onlyMobile.maxWidth + 1}
		return (
			<Responsive { ...notMobile } style={ {float: 'right'} }>
				<Menu secondary size='mini' className='settings-menu'>
			    <Menu.Item>
			      <Button
			      	className='accessibility-button'
			      	tabIndex='0'
			      	onClick={ () => handleItemClick('accessibility') }
			      	style={ accessibility ? greenstyle : plainstyle }
			      >
			      <Icon name={ accessibility ? 'check' : null }/>
			      Accessibility
			      </Button>
			    </Menu.Item>
			    <Menu.Item>
			    <select className='themes-dropdown' name='theme' tabIndex='0' onChange={ (e) => handleThemeChange(e) } label="" aria-label="Map Themes" style={ theme !== 'default' ? greenstyle : plainstyle }>
			    	{/* from stackoverflow.com "How do I make a placeholder for a 'select' box?" William Isted dtd Dec 9 '11' at 8:22  */}
			    	{/* the line below does precisely what I want but generates a warning which is not allowed in Udacity project */}
						{/*	<option value="" disabled selected hidden>Theme</option> */}
			    	<option className='themes-option' value='default' aria-label="default theme">Default</option>
			    	<option className='themes-option' value='fancy' aria-label="fancy theme">Fancy</option>
			    </select>
			    </Menu.Item>
			    <Menu.Item>
		      	<Modal
		      		trigger={
					      <Button
					      	className='about-button'
					      	tabIndex='0'
					      	onClick={ () => handleItemClick('about') }
					      	style={ plainstyle }
					      	content='About'
					      />
							}
							open={ showAbout }
							onClose={ toggleAboutPopup }
							size='mini'
						>
							<Modal.Header>About</Modal.Header>
							<Modal.Content>
								<p>Title: Venue Finder</p>
								<p>Author: Roger Svendsen</p>
								<p>Version: 0.1.0</p>
								<p>Date: 9 Oct 2018</p>
							</Modal.Content>
						</Modal>
			    </Menu.Item>
	  		</Menu>
  		</Responsive>
  	)
	}
}

export default SettingsMenu