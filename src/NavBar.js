import React, {Component} from 'react'
import {Responsive, Input, Grid, Checkbox} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './SearchBar.css'

// from Stackoverflow 'How to recreate auto-collapsable menu with semantic-ui for react?' Alexander Fedyashov dtd 20 Sep '17
class NavBar extends Component {

  static propTypes = {
    searchRadius: PropTypes.number.isRequired,
    maxReturnCount: PropTypes.number.isRequired,
    setSearchRadius: PropTypes.func.isRequired,
    setReturnCount: PropTypes.func.isRequired,
    showMap: PropTypes.bool.isRequired,
    toggleShowMap: PropTypes.func.isRequired
  }

  state = {
    visible: false
  }

  needNewDefaultValueRadius = true
  needNewDefaultValueMaxCount = true

  componentDidUpdate = () => {
    if (this.needNewDefaultValueRadius) {
      this.needNewDefaultValueRadius = false
      if (this.refs.radiusInput && this.refs.radiusInput.value) {
        this.refs.radiusInput.value = (this.props.searchRadius * 0.000621371).toFixed(1)
      }
      console.log("Radius on screen updated to ", (this.props.searchRadius * 0.000621371).toFixed(1))
    }
    if (this.needNewDefaultValueMaxCount) {
      this.needNewDefaultValueMaxCount = false
      if (this.refs.maxInputCount && this.refs.maxInputCount.value) {
        this.refs.maxCountInput.value = this.props.maxReturnCount
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

  render() {
    const {showMap} = this.props
    const {handleToggleShowMap} = this
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
            <div className="two column row">
{/* TODO: want to make this work for mobile */}
{/*                <div className="ui action input">
                  <Input type="text"
                         size="mini"
                         style={ {marginLeft: "24vw", width: '20vw'} }
                         ref="radiusInput"
                         onBlur={ this.handleRadiusInput }
                         placeholder="Search radius"
                         className="searchinput"
                  />
                </div>
                <div className="ui action input">
                  <Input type="text"
                         size="mini"
                         style={ {width: '20vw'} }
                         ref="maxCountInput"
                         onBlur={ this.handleReturnCountInput }
                         placeholder=" # Venues"
                         className="searchinput"
                  />
                </div>  */}
                <div className="ui action checkbox" style={ {width: '85vw'} }>
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
                           onBlur={ this.handleRadiusInput }
                           placeholder="Search radius"
                           className="searchinput"
                    />
                  </div>
                  <div className="ui action input">
                    <Input type="text"
                           size="mini"
                           style={ {marginLeft: '1vw', width: '20vw'} }
                           ref="maxCountInput"
                           onBlur={ this.handleReturnCountInput }
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
                           onBlur={ this.handleRadiusInput }
                           placeholder="Search radius"
                           className="searchinput"
                    />
                  </div>
                  <div className="ui action input">
                    <Input type="text"
                           size="small"
                           style={ {marginLeft: '1vw', width: '20vw'} }
                           ref="maxCountInput"
                           onBlur={ this.handleReturnCountInput }
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













