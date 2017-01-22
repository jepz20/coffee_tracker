import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Loader from '../components/Loader';
import { secondaryColor, primaryTextSize } from '../styles/general';
import dateformat from 'dateformat';
import { formatNumber } from '../utils/numbers';

const mapStateToProps = state => ({
  routing: state.routing,
  eventTypes: state.eventTypes,
  eventsList: state.eventsList,
  property: state.property,
});

class EventsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchEventsListByPropertyId, params } = this.props;

    fetchEventsListByPropertyId(params.propertyId);
  }

  render() {
    const { eventsList, eventTypes, property } = this.props;
    const { subProperties } = property.propertyDetail;

    const { detail, loading } = eventsList;

    if (loading) {
      return <Loader />;
    };

    const goToPath = path => (
       hashHistory.push(path)
     );

    return (
      <div className="news--landing">
        <List>
          <h3>Events</h3>
          {
            detail && Object.keys(detail).reverse().map((key, index) => (
                <div key={ index }>
                  <ListItem
                    primaryText={
                      <div style={ { ...primaryTextSize, fontWeight: '800' } }>
                        <div style={ { fontSize: '22px' } }>
                          { eventTypes[detail[key].eventsType].name }
                        </div>
                        {
                          subProperties
                          &&
                          <div>
                            <FontIcon className='fa fa-home'/>
                            { ' ' + subProperties[detail[key].eventsSubproperty].name }
                          </div>
                        }
                      </div>
                    }
                    secondaryText={
                      <div style={{ ...secondaryColor, ...primaryTextSize, height: 'auto' }}>
                        { detail[key].eventsExecutionDate
                          &&
                          <div>
                            <FontIcon className='fa fa-calendar-o'/>
                            {
                              ' Execution: ' +
                              dateformat(
                                new Date(detail[key].eventsExecutionDate * 1000), 'dd/mm/yyyy'
                              )
                            }
                          </div>
                        }
                        { detail[key].nextExecution
                          &&
                          <div>
                            <FontIcon className='fa fa-calendar-o'/>
                            {
                              ' Next Execution: ' +
                              dateformat(
                                new Date(detail[key].nextExecution * 1000), 'dd/mm/yyyy'
                              )
                            }
                          </div>
                        }
                        <div style={ { marginTop: '16px' }}>
                          {detail[key].eventsDescription}
                        </div>
                      </div>
                    }
                  />
                  <Divider/>
                </div>
            ))
          }
        </List>
        <FloatingActionButton
          style={{ position: 'fixed', bottom: '20px', right: '24px' }}
          aria-label="Add Event"
          onClick ={() => goToPath(`/properties/${this.props.params.propertyId}/events/add`)}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
  );
  }
};

EventsList = connect(mapStateToProps, actions)(EventsList);
export default EventsList;
