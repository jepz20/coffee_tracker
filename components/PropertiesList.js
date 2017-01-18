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
  propertiesList: state.propertiesList,
});

class PropertiesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchAllProperties } = this.props;
    fetchAllProperties();
  }

  render() {
    const { propertiesList } = this.props;
    const { allProperties, loading } = propertiesList;
    if (loading) {
      return <Loader />;
    };

    const handleEnter = (evt, id) => {
      if (evt.key === 'Enter') {
        goToMapDetail(id);
      }
    };

    const goToMapDetail = id => {
      hashHistory.push(`properties/${id}/map`);
    };

    return (
      <div className="news--landing">
        <List>
          <h3>Properties</h3>
          {
            allProperties.map((map, index) => (
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
                        { ' ' + map.description}
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

PropertiesList = connect(mapStateToProps, actions)(PropertiesList);
export default PropertiesList;
