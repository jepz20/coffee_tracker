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
  budgetList: state.budgetList,
});

class BudgetList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchBudgetListByPropertyId } = this.props;
    // fetchBudgetListByPropertyId();
  }

  render() {
    const { budgetList } = this.props;
    // const { allBudgets, loading } = budgetList;

    if (false) {
      return <Loader />;
    };

    return (
      <div>
        <button>Add Expense</button>
      </div>
  );
  }
};

BudgetList = connect(mapStateToProps, actions)(BudgetList);
export default BudgetList;
