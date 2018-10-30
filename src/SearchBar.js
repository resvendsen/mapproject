import React, {Component} from "react"
import {Form, Input, Responsive, Grid} from "semantic-ui-react"
import "./SearchBar.css"
import {handleKeyPress} from './utils'

class SearchBar extends Component {
	state = {
		searchLoc: "",
		searchReq: ""
	}

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.searchLoc) {
			this.props.onSearch(this.state)
		}
	}

	useCurrentLocation = e => {
		if (this.state.searchLoc !== 'Current Location') {
			this.setState({ searchLoc: 'Current Location' })
		} else {
			this.setState({ searchLoc: '' })
		}
	}

// TODO add a clear button to reset the search fields to blank
 	render() {
		return (
			<div className="ui stackable two column grid" style={ {paddingTop: 20} }>
				<Responsive minWidth={ 320 } maxWidth={ Responsive.onlyMobile.maxWidth }>
					<div className="column">
							<Form onSubmit={ this.handleSubmit }>
								<Form.Group>
									<Form.Field inline>
										<Input
											className="searchinput"
											fluid
											style={ {marginLeft: "15vw", width: "50vw"} }
											size="mini"
											onChange={ this.handleInputChange }
											value={ this.state.searchReq }
											name="searchReq"
											aria-label="Enter venue name, category:type or keyword"
											placeholder="Search for venue, category..."
										/>
									</Form.Field>
									<Form.Group inline>
										<Form.Field inline>
											<div className="ui icon input">
												<Input
													className="searchinput locationinput"
													size="mini"
													style={ {marginLeft: "16.3vw", width: "42vw"} }
													onChange={ this.handleInputChange }
													value={ this.state.searchLoc }
													name="searchLoc"
													aria-label="Enter Base Location"
													placeholder="Location"
												/>
												<i
													className="point link icon"
													onClick={ this.useCurrentLocation }
													onKeyPress={ (e) => handleKeyPress(e, this.useCurrentLocation) }
													tabIndex="0"
													aria-label="Current Location Button"
													style={ {color: "rgb(95, 124, 162)"} }>
												</i>
											</div>
										</Form.Field>
										<Form.Field inline>
											<div className="searchBarItem">
												<button className="ui icon primary button mini searchbutton" aria-label="Search Button" onClick={ this.handleSubmit } >
													<i className="search icon" />
												</button>
											</div>
										</Form.Field>
									</Form.Group>
								</Form.Group>
							</Form>
					</div>
				</Responsive>
				<Responsive minWidth={ Responsive.onlyTablet.minWidth } maxWidth={ Responsive.onlyTablet.maxWidth }>
					<div className="container" style={{paddingTop: 10}}>
						<Grid>
							<div className="searchBarItem">
								<Grid.Row style={ {marginLeft: "10vw"} }>
									<Form onSubmit={ this.handleSubmit }>
										<Form.Group style={ {marginTop: 15} }>
											<Form.Field inline>
												<Input
													className="searchinput"
													fluid
													style={ {width: '40vw'} }
													size="small"
													onChange={ this.handleInputChange }
													value={ this.state.searchReq }
													name="searchReq"
													aria-label="Enter venue name, category:type or keyword"
													placeholder="Search for venue, category: name, keyword..."
												/>
											</Form.Field>
											<Form.Group inline>
												<Form.Field inline>
													<div className="ui icon input">
														<Input
															className="searchinput locationinput"
															size="small"
															style={ {width: '32vw'} }
															onChange={ this.handleInputChange }
															value={ this.state.searchLoc }
															name="searchLoc"
															aria-label="Enter Base Location"
															placeholder="Location"
														/>
														<i
															className="point link icon"
															onClick={ this.useCurrentLocation }
															onKeyPress={ (e) => handleKeyPress(e, this.useCurrentLocation) }
															tabIndex="0"
															aria-label="Current Location Button"
															style={ {color: "rgb(95, 124, 162)"} }>
														</i>
													</div>
												</Form.Field>
											</Form.Group>
											<div className="searchBarItem">
												<button className="ui icon primary button small searchbutton" onClick={ this.handleSubmit } aria-label="Search Button">
													<i className="search icon" />
												</button>
											</div>
										</Form.Group>
									</Form>
								</Grid.Row>
							</div>
						</Grid>
					</div>
				</Responsive>
				<Responsive { ...Responsive.onlyComputer }>
					<div className="container" style={{paddingTop: 10}}>
						<Grid>
							<div className="searchBarItem">
								<Grid.Row style={ {marginLeft: "10vw"} }>
									<Form onSubmit={ this.handleSubmit }>
										<Form.Group style={ {marginTop: 15} }>
											<Form.Field inline>
												<Input
													className="searchinput"
													style={ {width: '40vw'} }
													size="medium"
													onChange={ this.handleInputChange }
													value={ this.state.searchReq }
													name="searchReq"
													aria-label="Enter venue name, category:type or keyword"
													placeholder="Search for venue, category, keyword..."
												/>
											</Form.Field>
											<Form.Group inline>
												<Form.Field inline>
													<div className="ui icon input">
														<Input
															className="searchinput locationinput"
															size="medium"
															style={ {width: '32vw'} }
															onChange={ this.handleInputChange }
															value={ this.state.searchLoc }
															name="searchLoc"
															aria-label="Enter Base Location"
															placeholder="Location"
														/>
														<i
															className="point link icon"
															onClick={ this.useCurrentLocation }
															onKeyPress={ (e) => handleKeyPress(e, this.useCurrentLocation) }
															tabIndex="0"
															aria-label="Current Location Button"
															style={ {color: "rgb(95, 124, 162)"} }>
														</i>
													</div>
												</Form.Field>
											</Form.Group>
											<div className="searchBarItem">
												<button className="ui icon primary button medium searchbutton" aria-label="Search Button" onClick={ this.handleSubmit }>
													<i className="search icon" />
												</button>
											</div>
										</Form.Group>
									</Form>
								</Grid.Row>
							</div>
						</Grid>
					</div>
				</Responsive>
			</div>
		);
	}
}

export default SearchBar