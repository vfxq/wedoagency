import React, {Component} from 'react';
import { connect } from 'react-redux'
import { loadAgencyPage } from '../../ducks/agencyPage';
import Loader from '../Loader';
import ErrorCmp from '../ErrorCmp';
import VideoBlock from '../VideoBlock'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class AgencyPage extends Component {
	
	componentDidMount(){
		const { useLang, loadAgencyPage } = this.props
		loadAgencyPage(useLang)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.useLang != nextProps.useLang){
			this.props.loadAgencyPage(nextProps.useLang);
		}
	}


	render(){
		const {match, entities, useLang, loading, error} = this.props
		
		if (loading) return <Loader />;
		if (error) return (<ErrorCmp error={error} />);	

		const header = {
			backgroundImage: `-webkit-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-moz-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-o-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `-ms-image-set( url(${entities.acf.foto}) 1x, url(${entities.acf.Fotox2}) 2x )`,
			backgroundImage: `url(${entities.acf.foto})`
		};

		const headerBlock = window.innerWidth > 768  || entities.acf.videoHeader ? <div className="headerImgBlock" style={{overflow: 'hidden'}} key={entities.acf.videoHeader}>
																											    	 		 <video id="video_bg" autoPlay="autoplay" loop="loop" >
																											    	 			 <source src={entities.acf.videoHeader.url} type="video/mp4"></source>
																											    	 		 </video>
																											    	 	 </div>
																											    	 : <div className="articleImgNews" style={header} />


    const videoBlock = entities.acf.video ? <VideoBlock video={entities.acf.video} class={'agencyVideo'}/> : null

    if (window.innerWidth < 768){
    		return (
					<div className="articlePage">
						{headerBlock}
						<div className="container">
							<div className="row no-gutters">
								<div className="col-md-6">
									<h1>
			 							{entities.title.rendered}
			 						</h1>
								</div>
								<div className="col-md-6">
									<div dangerouslySetInnerHTML={{ __html: entities.content.rendered }} />
								</div>
							</div>
							<div className="row no-gutters">
								<div className="col-md-6 agencyPage__collage">
									<img src={`${entities.acf.collage}`} />
								</div>
								<div className="col-md-6">
									<div className='p'>
										<div dangerouslySetInnerHTML={{ __html: entities.acf.extendText }} />
									</div>
			 						<div className="sign">
			 							{entities.acf.sign}
			 						</div>
								</div>
							</div>
							{videoBlock}
						</div>
 					</div>
				)
    }
		
		return (
			<div className="articlePage">
				<ReactCSSTransitionGroup transitionName="anim" 
																 transitionAppear={true} 
																 transitionAppearTimeout={2000}
																 transitionEnter={false} 
																 transitionLeave={false}>
					{headerBlock}
					<div className="container">
		 				<div className="row no-gutters">
		 					<div className="col-md-6 agencyPage__collage">
		 						<img src={`${entities.acf.collage}`} />
		 					</div>
		 					
		 					<div className="col-md-5 agencyInfo">
		 						<h1>
		 							{entities.title.rendered}
		 						</h1>
		 						<div dangerouslySetInnerHTML={{ __html: entities.content.rendered }} />
		 						<div dangerouslySetInnerHTML={{ __html: entities.acf.extendText }} />
		 						<div className="sign">
		 							{entities.acf.sign}
		 						</div>
		 					</div>
		 				</div>
		 				{videoBlock}
		 			</div>
		 		</ReactCSSTransitionGroup>	
 			</div>
		)
	}	
}

const mapStateToProps = state => {
	return{
		useLang: state.lang.useLang,
		entities: state.AgencyPage.entities,
		loading: state.AgencyPage.loading,
		error: state.AgencyPage.error
	}
}
	
export default connect(mapStateToProps, { loadAgencyPage })(AgencyPage)