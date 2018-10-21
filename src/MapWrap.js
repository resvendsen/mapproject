import React from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'

// from github.com/tomchentw/react-google-maps Non-Recompose examples #636 MonsieurV Oct 3, 2017
const MapWrap = withScriptjs(withGoogleMap(props => {
  return <GoogleMap {...props} ref={ props.onMapMounted }>{ props.children }</GoogleMap>
}))

export default MapWrap