import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import InfiniteScroll from 'react-infinite-scroller';
import { limitText } from '../utils/strings.js';
import Loader from '../components/Loader';
import { secondaryColor } from '../styles/general.js';

const NewsCard = props => {
  const { newsDetail } = props;
  if (!newsDetail) {
    return null;
  }

  let description = limitText(newsDetail.description, 300);
  const enterNews = () => {
    if (newsDetail.isExternalLink) {
      window.open(newsDetail.externalLink, '_blank');
    } else {
      hashHistory.push(`/news/${newsDetail.id}`);
    }
  };

  const handleEnter = evt => {
    if (evt.key === 'Enter') {
      enterNews();
    }
  };

  let subtitle;
  let href;
  let ExternalHeader;

  if (newsDetail.isExternalLink) {
    subtitle = `Source: ${newsDetail.originalSource}`;
    href = newsDetail.externalLink;
    ExternalHeader =
      <CardText style={ { ...secondaryColor, padding: 0, fontSize: 16 } }>
        <FontIcon
          style={{ ...secondaryColor, padding: 10 }}
          className="fa fa-external-link"
        />
        External Link
      </CardText>;
  } else {
    subtitle = `Author: ${newsDetail.author}`;
    href = `/news/${newsDetail.id}`;
    ExternalHeader = null;
  }

  return (
    <div>
      <Card
        onClick={ enterNews }
        onKeyPress={ handleEnter }
        style={ { cursor: 'pointer' } }
        role="link"
        tabIndex="0"
        href={href}
      >
        { ExternalHeader }
        <CardMedia
          overlay={
            <CardTitle title={newsDetail.title}
              subtitle={ subtitle }
              subtitleStyle= { { color: '#fff' } }
            />
          }
          >
            <img src={ newsDetail.image}
              alt={ newsDetail.imageDescription
                ? newsDetail.imageDescription
                : `${newsDetail.title} Main Image`
              }
            />
        </CardMedia>
        <CardText style={ { fontSize: 16 } }>
          { description }
        </CardText>
      </Card>
      <br/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  news: state.news,
  routing: state.routing,
});

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchFirstNews } = this.props;
    fetchFirstNews();
  }

  render() {
    const { news, fetchMoreNews, setResetLastQuery } = this.props;
    const { newsFeed, lastQueryKey, hasMoreItems, loading } = news;

    const loadMore = () => {
      if (loading) {
        return;
      }

      setResetLastQuery();
      fetchMoreNews(lastQueryKey);
    };

    return (
      <div className="news--container">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMoreItems}
          loader={ <Loader /> }
          >
            {
              Object.keys(newsFeed).reverse().map(key => (
                <NewsCard key={key} newsDetail={newsFeed[key]}/>
              ))
            }
          </InfiniteScroll>
      </div>
    );
  }
}

News = connect(mapStateToProps, actions)(News);
export default News;
