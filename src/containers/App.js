import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../action';

const mapStateToProps = (state) => {
	return {

		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}
//use this syntax for non-pre-built react functions such as render and constructor, 
//otherwise, the input->event->this doesnt have a state
	// onSearchChange = (event) => { 
	// 	this.setState({ searchfield: event.target.value })
		
	// }

	render() {
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filterRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return isPending ?
		<h1>Loading...</h1>:
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					{ isPending ? <h1>Loading...</h1> :
					<ErrorBoundry> 
						<CardList robots={filterRobots} />
					</ErrorBoundry>	
				}
				</Scroll>
			</div>

		);
	}	
		
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


