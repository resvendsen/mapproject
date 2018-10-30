import React, { Component } from 'react'
import {Image, Grid} from 'semantic-ui-react'
import './App.css'
import Home from './Home'
import SettingsMenu from './SettingsMenu'

/* These are used when nothing is entered in search radius or max return count */
const DEFAULT_RADIUS = 10000.0     /* meters */  /* 4square Max = 100,000 */
const DEFAULT_MAX_RETURN_COUNT = 30  /* 4square Max = 50 */
const DEFAULT_MAX_RETURN_COUNT_NONCOMPUTER = 5
/* style layout map themes */
/* fancy is from github.com/tomchentw/react-google-maps/src/components/addons/InfoBox.md dtd 3Nov17 */
const themes = ['fancy', 'default']

class App extends Component {
  state = {
    searchRadius: DEFAULT_RADIUS,
    maxReturnCount: (window.innerWidth > 991 ? DEFAULT_MAX_RETURN_COUNT : DEFAULT_MAX_RETURN_COUNT_NONCOMPUTER),
    theme: 'default',
    accessibility: false,
    showMap: true
  }

  setSearchRadius = (radius) => {
    if (radius === "0") {
      this.setState({
        searchRadius: DEFAULT_RADIUS
      })
      console.log("App.state.searchRadius set to ", DEFAULT_RADIUS)
    } else {
      const radiusInMeters = radius * 1609.34
      this.setState({
        searchRadius: radiusInMeters
      })
      console.log("App.state.searchRadius set to ", radiusInMeters)
    }
  }

  setReturnCount = (count) => {
    // make sure it's a number
    if (/^[0-9]+(\.[0-9]+)?|\.[0-9]+/.test(count)) {
      this.setState({
        maxReturnCount: (count === 0 ? DEFAULT_MAX_RETURN_COUNT : count-0)
      })
      console.log("App.state.maxReturnCount set to ", (count-0 === 0 ? DEFAULT_MAX_RETURN_COUNT : count-0))
    } else {
      this.setState({
        maxReturnCount: DEFAULT_MAX_RETURN_COUNT
      })
      console.log("App.state.maxReturnCount set to ", DEFAULT_MAX_RETURN_COUNT)
    }
  }

  toggleShowMap = () => {
    this.setState(prevstate => {
      return {showMap: !prevstate.showMap}
    },
      () => console.log('App showMap updated to ', this.state.showMap)
    )
  }

  // sets the theme for map display
  setTheme = (theme) => {
    if (themes.includes(theme)) {
      this.setState({theme: theme},
        () => console.log("Theme set to ", this.state.theme)
      )
    } else
    if (this.state.theme === '' || this.state.theme === undefined) {
      this.setState({theme: 'default'},
        () => console.log("Theme set to ", this.state.theme)
      )
    } else {
      alert("***Program should never reach this point in App.js setTheme.  Please contact programmer***")
    }
  }

  toggleAccessibility = () => {
    this.setState(prevstate => {
      return {accessibility: !prevstate.accessibility}
    },
      () => console.log('Accessibility set to ', this.state.accessibility)
    )
  }

  render() {
    const {setSearchRadius, setReturnCount, toggleShowMap, setTheme, toggleAccessibility} = this
    const {searchRadius, maxReturnCount, theme, accessibility, showMap} = this.state
    return (
      <div className="App">
        <div className="App-header">
          <Grid>
            <Grid.Row>
              <Grid.Column floated="left" width="2">
                <Image className="App-logo" size="mini" src="https://react.semantic-ui.com/logo.png" alt="Semantic UI React Logo" />
              </Grid.Column>
              <Grid.Column floated="left" width="8" style={ {marginLeft: '-10vw', marginRight: 'auto'} }>
                <h1 className="App-title" tabIndex={ accessibility ? "0" : "-1" }>Venue Finder</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column float="left" only="mobile" width="4">
              </Grid.Column>
              <Grid.Column width="16" only="tablet computer">
                <SettingsMenu
                  toggleAccessibility={ toggleAccessibility }
                  accessibility={ accessibility }
                  setTheme={ setTheme }
                  theme={ theme }
                  showMap={ showMap }
                  toggleShowMap={ toggleShowMap }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Home
          searchRadius={ searchRadius }
          maxReturnCount={ maxReturnCount }
          setSearchRadius={ setSearchRadius }
          setReturnCount={ setReturnCount }
          showMap={ showMap }
          toggleShowMap={ toggleShowMap }
          accessibility={ accessibility }
          toggleAccessibility={ toggleAccessibility }
          theme={ theme }
          setTheme={ setTheme }
        />
      </div>
    )
  }
}

export default App
