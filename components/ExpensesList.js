import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Loader from '../components/Loader';
import { secondaryColor, primaryTextSize } from '../styles/general';
import dateformat from 'dateformat';
import { formatNumber } from '../utils/numbers';

const mapStateToProps = state => ({
  routing: state.routing,
  expensesList: state.expensesList,
});

class ExpensesList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchExpensesListByPropertyId, params } = this.props;
    fetchExpensesListByPropertyId(params.propertyId);
  }

  render() {
    const { expensesList } = this.props;

    const { detail, loading } = expensesList;

    if (loading) {
      return <Loader />;
    };

    const handleEnter = (evt, id) => {
      if (evt.key === 'Enter') {
        goToExpenseDetail(id);
      }
    };

    const goToPath = path => (
      hashHistory.push(path)
    );

    const goToExpenseDetail = id => {
      const { expensesList, params } = this.props;
      goToPath(`properties/${params.propertyId}/expenses/${id}`);
    };

    return (
      <div className="news--landing">
        <List>
          <h3>Expenses</h3>
          {
            detail && Object.keys(detail).reverse().map((key, index) => (
                <div key={ index }>
                  <ListItem
                    role="button"
                    onClick={ e => goToExpenseDetail(key)}
                    onKeyPress={ e => handleEnter(e, key)}
                    primaryText={
                      <div style={ { ...primaryTextSize, fontWeight: '800' } }>
                        { detail[key].expensesName }
                      </div>
                    }
                    secondaryText={
                      <div style={{ ...secondaryColor, ...primaryTextSize, height: '46px' }}>
                        <div>
                          Total: { ' $' + formatNumber(detail[key].total) + ' '}
                        </div>
                        <div>
                          Date:
                          { detail[key].expensesDate
                            ? dateformat(
                              new Date(detail[key].expensesDate * 1000), 'dd/mm/yyyy'
                            )
                            : '' }
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
        <FloatingActionButton
          style={{ position: 'fixed', bottom: '20px', right: '24px' }}
          aria-label="Add Expense"
          onClick ={() => goToPath(`/properties/${this.props.params.propertyId}/expenses/add`)}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
  );
  }
};

ExpensesList = connect(mapStateToProps, actions)(ExpensesList);
export default ExpensesList;
