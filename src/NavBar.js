import React, {Component} from 'react'
import {Responsive, Input, Grid, Checkbox, Dropdown, Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './SearchBar.css'
import './NavBar.css'

// from Stackoverflow 'How to recreate auto-collapsable menu with semantic-ui for react?' Alexander Fedyashov dtd 20 Sep '17
class NavBar extends Component {

  static propTypes = {
    searchRadius: PropTypes.number.isRequired,
    maxReturnCount: PropTypes.number.isRequired,
    setSearchRadius: PropTypes.func.isRequired,
    setReturnCount: PropTypes.func.isRequired,
    showMap: PropTypes.bool.isRequired,
    toggleShowMap: PropTypes.func.isRequired,
    accessibility: PropTypes.bool.isRequired,
    toggleAccessibility: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired
  }

  state = {
    visible: false,
    showAbout: false,
    activeItem: null,
    // used for both mobile and computer radius settings
    needNewDefaultValueRadius: true,
    // used only for mobile settings radius dropdown
    settingsDropdownOpen: false
  }

  needNewDefaultValueMaxCount = true

  componentDidUpdate = () => {
    if (this.state.needNewDefaultValueRadius) {
      this.setState((prevstate) => {
        return {needNewDefaultValueRadius: !prevstate.needNewDefaultValueRadius}
      },
        () => {
          console.log("needNewDefaultValueRadius set to ", this.state.needNewDefaultValueRadius)
          if (this.refs.radiusInput && this.refs.radiusInput.value) {
            this.refs.radiusInput.value = (this.props.searchRadius * 0.000621371).toFixed(1)
          }
          console.log("Radius on screen updated to ", (this.props.searchRadius * 0.000621371).toFixed(1))
        }
      )
    }
    if (this.needNewDefaultValueMaxCount) {
      this.needNewDefaultValueMaxCount = false
      if (this.refs.maxInputCount && this.refs.maxInputCount.value) {
        this.refs.maxInputCount.value = this.props.maxReturnCount
        console.log("Max Count on screen updated to ", this.props.maxReturnCount)
      }
    }
  }

  handleRadiusInput = (e) => {this.props.setSearchRadius(e.target.value)}

  handleReturnCountInput = (e) => {this.props.setReturnCount(e.target.value)}

  handleToggleShowMap = (e) => {
    if (e.type === 'click') {
      this.props.toggleShowMap()
      console.log('ToggleShowMap: ', e.type)
    }
  }

  toggleAboutPopup = () => {
    this.setState(prevstate => {
      return {showAbout: !prevstate.showAbout}
    },
      () => console.log('Show About 2 set to ', this.state.showAbout)
    )
  }

  handleItemClick = (item) => {
    this.toggleAboutPopup()
    this.setState({ activeItem: item },
      ()  => console.log("Settings 2 active item changed to ", this.state.activeItem)
    )
  }

  toggleSettingsDropdown = (e) => {
    // only want the Dropdown click event to change state when it was clicked, not when its child was clicked
    if (e.target.isSameNode(e.currentTarget)) {
      this.setState((prevstate) => {
        // needNewDefaultValueRadius set to false since the dropdown is not open yet -- once open it goes to true
        // this false setting also puts it in sync with componentDidUpdate for mobile
        return {settingsDropdownOpen: !prevstate.settingsDropdownOpen}
      },
//        () => {console.log("needNewDefaultValueRadius set to false")
          () =>  {console.log("Settings Dropdown toggled ", this.state.settingsDropdownOpen)
                   if (!this.state.settingsDropdownOpen) {document.getElementById('settingsMenu').focus()}
                  }
      )
    }
  }

  handleAccessibilityClick = (e) => {
    if (!this.props.accessibility && this.props.showMap) {
        this.props.toggleShowMap()
    }
    this.props.toggleAccessibility()
    e.stopPropagation()
  }

  handleRadiusFocus = (e) => {
    e.stopPropagation()
  }

  handleThemeChange = (e) => {
    this.props.setTheme(e.target.value)
    e.stopPropagation()
  }

  render() {
    const {showMap, searchRadius, maxReturnCount, accessibility, theme} = this.props
    const {showAbout, settingsDropdownOpen} = this.state
    const {handleToggleShowMap, handleRadiusInput, handleReturnCountInput, handleItemClick, toggleAboutPopup, toggleSettingsDropdown, handleRadiusFocus, handleAccessibilityClick, handleThemeChange} = this
    const standardstyle = {color: '#222', backgroundColor: '#fff'}
    const greenstyle = {color: 'lightgreen', backgroundColor: 'white', border: '1px solid #ddd'}
    const plainstyle = {color: '#222', backgroundColor: 'white', border: '1px solid #ddd'}
    const searchRadiusCalc = (searchRadius * 0.000621371).toFixed(1)
    return (
      <div>
        <div className="ui two column grid">
          {/* from github.com/Semantic-Org/Semntic-UI/src/thems/flat/globals/site.variables */}
          {/*-------------------
               Breakpoints
          --------------------

          @mobileBreakpoint            : 320px;
          @tabletBreakpoint            : 768px;
          @computerBreakpoint          : 992px;
          @largeMonitorBreakpoint      : 1400px;
          @widescreenMonitorBreakpoint : 1900px;
          */}
          {/* The below appears to be the correct table */}
          {/* from github.com/Semantic-Org/Semantic-UI/src/addons/Responsive/Responsive.js
          static onlyMobile = { minWidth: 320, maxWidth: 767 }
          static onlyTablet = { minWidth: 768, maxWidth: 991 }
          static onlyComputer = { minWidth: 992 }
          static onlyLargeScreen = { minWidth: 1200, maxWidth: 1919 }
          static onlyWidescreen = { minWidth: 1920 }   */}
          <Responsive minWidth={ 320 } maxWidth={ Responsive.onlyMobile.maxWidth }>  {/* 320 - 767px */}
            <Grid>
                <Grid.Row centered className="settingsRow">
                  <Dropdown
                    className='settingsMenu'
                    id='settingsMenu'
                    tabIndex='0'
                    text='  Settings  '
                    style={ {marginLeft: '25vw', border: '1px solid #ddd', borderRadius: '5px'} }
                    open={ settingsDropdownOpen }
                    onClick={ toggleSettingsDropdown }
                  >
                    <Dropdown.Menu open={ settingsDropdownOpen }>
                      {/* Accessibility for mobile */}
                      <Dropdown.Item
                        className='accessibility-item'
                        tabIndex='0'
                        onClick={ (e) => handleAccessibilityClick(e) }
                        style={ accessibility ? greenstyle : plainstyle }
                      >
                      Accessibility
                      </Dropdown.Item>
                      {/* Themes for mobile */}
                      <Dropdown.Item>
                        Theme&nbsp;&nbsp;
                        <select
                          className='themes-dropdown'
                          tabIndex='0'
                          aria-label='Themes'
                          onChange={ handleThemeChange }
                          style={ theme === 'default' ? plainstyle : greenstyle }
                        >
                          <option className='themes-option' value='default' aria-label='Default'>Default</option>
                          <option className='themes-option' value='fancy' araia-label='Fancy'>Fancy</option>
                        </select>
                      </Dropdown.Item>
                      {/* Search Radius for mobile */}
                      <Dropdown.Item>
                        <span>Radius&nbsp;&nbsp;</span>
                        <Input
                          type='text'
                          defaultValue={ searchRadiusCalc }
                          style={ {width: "53px", height: "16px", fontSize: "14px", border: '1px solid #ddd', borderRadius: '5px'} }
                          ref="radiusInput"
                          onFocus={ handleRadiusFocus }
                          onClick={ handleRadiusFocus }
                          onBlur={ handleRadiusInput }
                          aria-label="Search Radius"
                          size='mini'
                          tabIndex='0'
                          className="searchRadiusInput"
                        />
                      </Dropdown.Item>
                      {/* Return Count for mobile */}
                      <Dropdown.Item>
                        <span>Return #&nbsp;&nbsp;</span>
                        <select
                          className='count-dropdown'
                          name='count'
                          ref='maxInputCount'
                          tabIndex='0'
                          onChange={ (e) => handleReturnCountInput(e) }
                          label=""
                          aria-label="Return Count"
                          defaultValue={ maxReturnCount }
                          style={ maxReturnCount === 5 ? plainstyle : greenstyle }
                        >
                          <option className='count-option' value='5' aria-label="5">5</option>
                          <option className='count-option' value='10' aria-label="10">10</option>
                          <option className='count-option' value='15' aria-label="15">15</option>
                        </select>
                      </Dropdown.Item>
                      {/* About for mobile */}
                      <Modal
                        trigger={
                          <Dropdown.Item
                            className='about-button'
                            tabIndex='0'
                            onClick={ () => handleItemClick('about') }
                            style={ standardstyle }
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
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="ui action checkbox" style={ {width: '35vw'} }>
                    <Checkbox
                      checked={ showMap ? true : false }
                      className="searchinput"
                      tabIndex="0"
                      label='Show Map'
                      onClick={ handleToggleShowMap }
                      style={ {marginLeft: '1vw'} }
                    />
                  </div>
                </Grid.Row>
            </Grid>
          </Responsive>
        </div>
        <div>
          <Responsive minWidth={ Responsive.onlyTablet.minWidth } maxWidth={ Responsive.onlyTablet.maxWidth }>  {/* 768 - 991px */}
            <Grid>
              <Grid.Row centered style={ {marginTop: 10} }>
                <div className="three column row">
                  <div className="ui action input">
                    <Input type="text"
                           size="mini"
                           style={ {marginLeft: '24vw', width: '20vw'} }
                           ref="radiusInput"
                           onBlur={ handleRadiusInput }
                           aria-label="Search Radius"
                           placeholder="Search radius"
                           className="searchinput"
                    />
                  </div>
                  <div className="ui action input">
                    <Input type="text"
                           size="mini"
                           style={ {marginLeft: '1vw', width: '20vw'} }
                           ref="maxCountInput"
                           onBlur={ handleReturnCountInput }
                           aria-label="# Venues to return"
                           placeholder="# Venues to return"
                           className="searchinput"
                    />
                  </div>
                  <div className="ui action checkbox">
                    <Checkbox
                      checked={ showMap ? true : false }
                      className="searchinput"
                      tabIndex="0"
                      label='Show Map'
                      onClick={ handleToggleShowMap }
                      style={ {marginLeft: '1vw'} }
                    />
                  </div>
                </div>
              </Grid.Row>
            </Grid>
          </Responsive>
        </div>
{/* TODO for larger screens add more detail */}
        <div>
          <Responsive { ...Responsive.onlyComputer}>  {/* 992 - 1399px */}
            <Grid>
              <Grid.Row centered style={ {marginTop: 10} }>
                <div className="three column row">
                  <div className="ui action input">
                    <Input type="text"
                           size="small"
                           style={ {marginLeft: '24vw', width: '20vw'} }
                           ref="radiusInput"
                           onBlur={ handleRadiusInput }
                           placeholder="Search radius"
                           aria-label="Search Radius"
                           className="searchinput"
                    />
                  </div>
                  <div className="ui action input">
                    <Input type="text"
                           size="small"
                           style={ {marginLeft: '1vw', width: '20vw'} }
                           ref="maxCountInput"
                           onBlur={ handleReturnCountInput }
                           aria-label="# Venues to return"
                           placeholder="# Venues to return"
                           className="searchinput"
                    />
                  </div>
                  <div className="ui action checkbox">
                    <Checkbox
                      checked={ showMap ? true : false }
                      className="searchinput"
                      tabIndex="0"
                      label='Show Map'
                      onClick={ handleToggleShowMap }
                      style={ {marginLeft: '1vw'} }
                    />
                  </div>
                </div>
              </Grid.Row>
            </Grid>
          </Responsive>
        </div>
      </div>
    )
  }
}

export default NavBar













