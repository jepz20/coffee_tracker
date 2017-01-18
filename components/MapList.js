import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Loader from '../components/Loader';
import dateformat from 'dateformat';

const mapStateToProps = state => ({
  routing: state.routing,
  mapsList: state.mapsList,
});

class MapList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchAllMaps } = this.props;
    fetchAllMaps();
  }

  render() {
    const { mapsList } = this.props;
    const { allMaps, loading } = mapsList;

    if (!mapsList.loaded) {
      return <Loader />;
    };

    const handleEnter = (evt, id) => {
      if (evt.key === 'Enter') {
        goToMapDetail(id);
      }
    };

    const goToMapDetail = id => {
      hashHistory.push(`map/${id}`);
    };

    return (
      <div className="news--landing">
        <List>
          <h3>Properties</h3>
          {
            allMaps.map((map, index) => (
                <div key={ index }>
                  <ListItem
                    role="button"
                    onClick={ e => goToMapDetail(map.id)}
                    onKeyPress={ e => handleEnter(e, map.id)}
                    primaryText={ map.name }
                    secondaryText={
                      <p>
                        <span>
                          { map.dateItWasPlanted
                            ? dateformat(
                              new Date(map.dateItWasPlanted * 1000), 'dd/mm/yyyy'
                            )
                            : '' }
                        </span> --
                        { map.description}
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                  <Divider/>
                </div>
            ))
          }
        </List>
      </div>
  );
  }
};

MapList = connect(mapStateToProps, actions)(MapList);
export default MapList;
