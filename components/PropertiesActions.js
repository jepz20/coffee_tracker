import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Loader from '../components/Loader';
import Map from './Map';
import ExpensesList from './ExpensesList';
import EventsList from './EventsList';
import GraphsProperty from './GraphsProperty';

const mapStateToProps = state => ({
  routing: state.routing,
  propertiesActions: state.propertiesActions,
});

class PropertiesActions extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentWillMount() {
    const { propertiesActions, params } = this.props;
    const filterTabs = propertiesActions.tabs.filter(tab => tab.route == params.action);

    if (filterTabs.length <= 0) {
      hashHistory.push('/404');
    }
  }

  updateTabs() {
    const { setActiveTabFromRoute, params } = this.props;
    setActiveTabFromRoute(params.action);
  }

  componentDidMount() {
    this.updateTabs();
  }

  handleTabClick(tab) {
    const { setActiveTab, propertiesActions, params } = this.props;
    if (tab.index !== propertiesActions.activeTab) {
      setActiveTab(tab.index);
      hashHistory.push(`properties/${params.propertyId}/${tab.route}`);
    }
  }

  render() {
    const { propertiesActions, params } = this.props;

    const handleEnter = (evt, id) => {
      if (evt.key === 'Enter') {
        goToPropertyAction(id);
      }
    };

    const { activeTab, tabs } = propertiesActions;

    // Set Child base on route
    let child;
    switch (params.action) {
      case 'map':
        child = <Map/>;
        break;
      case 'expenses':
        child =  <ExpensesList />;
        break;
      case 'events':
        child =  <EventsList />;
        break;
      case 'graphs':
        child =  <GraphsProperty />;
        break;
      default:
        child = null;
    }

    return (
      <div>
        <Tabs
          value={ activeTab }
           >
            { tabs.map(tab =>
              <Tab
                key={ tab.index }
                value = { tab.index }
                onClick   = {() => this.handleTabClick(tab)}
                icon={<FontIcon className={tab.icon}/>}
                label={<div className='tab-label'>{tab.label}</div>}
                >
                </Tab>
              )
            }
        </Tabs>
        { child && React.cloneElement(child, { params }) }
      </div>
  );
  }
};

PropertiesActions = connect(mapStateToProps, actions)(PropertiesActions);
export default PropertiesActions;
