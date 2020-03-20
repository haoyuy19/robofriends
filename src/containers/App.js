import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield:''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({robots: users}));
	
	}
//use this syntax for non-pre-built react functions such as render and constructor, 
//otherwise, the input->event->this doesnt have a state
	onSearchChange = (event) => { 
		this.setState({ searchfield: event.target.value })
		
	}

	render() {
		const { robots, searchfield } = this.state;
		const filterRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return !robots.length ?
		<h1>Loading...</h1>:
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filterRobots} />
					</ErrorBoundry>	
				</Scroll>
			</div>

		);
	}	
		
}

export default App;