import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Loader from '../components/Loader';

const mapStateToProps = state => ({
  routing: state.routing,
  newsLanding: state.newsLanding,
});

class NewsLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchNewsById, params } = this.props;
    fetchNewsById(params.newsId);
  }

  render() {
    const { newsLanding } = this.props;
    const { newsDetail, loading } = newsLanding;
    if (!newsDetail && !loading) {
      return <div>Sorry...</div>;
    };

    if (loading) {
      return <Loader />;
    }

    const imageAlt = newsDetail.imageDescription
      ? newsDetail.imageDescription
      : `${newsDetail.title} Landing Image`;

    return (
      <div className="news--landing">
        <img
          src={newsDetail.image} alt= { imageAlt }
        />
        <h2>
          <div>{ newsDetail.author &&  <span>@{newsDetail.author}</span> }</div>
          { newsDetail.title}
        </h2>
        <Divider></Divider>
        <div className="news--landing__description">
          { newsDetail.description }
        </div>
      </div>
  );
  }
};

NewsLanding = connect(mapStateToProps, actions)(NewsLanding);
export default NewsLanding;
