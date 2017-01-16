import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { hashHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import InfiniteScroll from 'react-infinite-scroller';
import { limitText } from '../utils/strings.js';

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

  return (
    <div>
      <Card onClick={ enterNews } role="link"> {
          newsDetail.isExternalLink ?
            <CardText style={ { padding: 0, fontSize: 16 } }>
              <IconButton style={{ padding: 0 }} iconClassName="fa fa-external-link" />
              External Link
            </CardText>
          : <div></div>
        }
        <CardMedia
          overlay={
            <CardTitle title={newsDetail.title}
              subtitle={`Source: ${newsDetail.originalSource}`}
            />
          }
          >
            <img src={ newsDetail.image} />
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

    const loadFunc = () => {
      if (loading) {
        return;
      }

      setResetLastQuery();
      fetchMoreNews(lastQueryKey);
    };

    return (
      <main>
        <div className="news--container">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={hasMoreItems}
            loader={<div className="loader">Loading ...</div>}
            >
              {
                Object.keys(newsFeed).reverse().map(key => (
                  <NewsCard key={key} newsDetail={newsFeed[key]}/>
                ))
              }
            </InfiniteScroll>
        </div>
      </main>
    );
  }
}

News = connect(mapStateToProps, actions)(News);
export default News;
