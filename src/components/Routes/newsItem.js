import React, {Component} from 'react';
import Portfolio from '../Portfolio';
import NewsArticle from '../NewsArticle';

class RouteNewsArticle extends Component {

	render(){
		
		return (
			<div>
				<NewsArticle location={this.props.location} match={this.props.match}/>
				<Portfolio match={this.props.match}/>
			</div>
		)
	}
}

export default RouteNewsArticle
