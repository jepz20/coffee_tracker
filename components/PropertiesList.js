import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Loader from '../components/Loader';
import dateformat from 'dateformat';
import { primaryTextSize, secondaryColor } from '../styles/general';

const propertyStateToProps = state => ({
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
      const { setPropertyDetail, propertiesList } = this.props;
      setPropertyDetail(propertiesList.allProperties[id]);
      hashHistory.push(`properties/${id}/map`);
    };

    return (
      <div className="news--landing">
        <List>
          <h3>Properties</h3>
          {
            allProperties.map((property, index) => (
                <div key={ index }>
                  <ListItem
                    role="button"
                    onClick={ e => goToMapDetail(property.id)}
                    onKeyPress={ e => handleEnter(e, property.id)}
                    primaryText={
                      <div style={ { ...primaryTextSize, fontWeight: '800' } }>
                        { property.name }
                      </div>
                    }
                    secondaryText={
                      <div style={{ ...secondaryColor, ...primaryTextSize, height: 'auto' }}>
                        <div>
                          <span>
                            { property.dateItWasPlanted
                              ? dateformat(
                                new Date(property.dateItWasPlanted * 1000), 'dd/mm/yyyy'
                              )
                              : '' }
                          </span> --
                          { ' ' + property.description}
                        </div>
                      </div>
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

PropertiesList = connect(propertyStateToProps, actions)(PropertiesList);
export default PropertiesList;
