import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import {
  primaryTextSize, primaryColor, bigTitle,
  forms, subformsFullWidth, subformHeader
} from '../styles/general';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Loader from './Loader';
import {
  Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';
import FormLayout from './FormLayout';
import ViewInput from './ViewInput';
import { formatNumber } from '../utils/numbers';
import dateformat from 'dateformat';

const mapStateToProps = state => ({
  routing: state.routing,
  expenseLanding: state.expenseLanding,
  expensesCategories: state.expensesCategories,
  property: state.property,
});

class ExpenseLanding extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchExpenseById, params, expensesCategories, fetchExpensesCategories } = this.props;
    fetchExpenseById(params.propertyId, params.expenseId);

    if (expensesCategories.detail.length == 0) {
      fetchExpensesCategories();
    }
  }

  render() {
    const { expenseLanding, expensesCategories, property } = this.props;
    const { detail, loading } = expenseLanding;
    const { propertyDetail } = property;
    const { subProperties } = propertyDetail;

    if (!detail && !loading) {
      return <div>Sorry...</div>;
    };

    if (loading) {
      return <Loader />;
    }

    return (
      <FormLayout title={detail.expensesName}>
        <div className="general--form__view">
          <div style={ { display: 'flex' } }>
            <div className="inline--inputs__1">
              <h4 style={ { ...bigTitle, textAlign: 'start' } } >
                <FontIcon
                  className="fa fa-calendar-o"
                />
                {' ' + dateformat(new Date(detail.expensesDate * 1000), 'dd-mm-yyyy')}
              </h4>
            </div>
            <div className="inline--inputs__1">
              <h4 style={ { ...bigTitle, textAlign: 'end' } } >
                <FontIcon
                  className="fa fa-money"
                />
                { ' $' + formatNumber(detail.total) }
              </h4>
            </div>
          </div>
              {
                detail.expenses.map((exp, index) => (
                  <Paper style={{ ...forms, ...subformsFullWidth }} key={ index } zDepth={2}>
                    <h4 style={ subformHeader }>
                      Expense #{ index + 1 }
                    </h4>
                    <div className="general--form__view">
                      <div className="inline--inputs">
                        <div className="inline--inputs inline--inputs__1">
                          <div className="inline--inputs__1">
                              <ViewInput
                                label="Category"
                                content= { expensesCategories.detail[exp.expensesCategory]
                                          ? expensesCategories.detail[exp.expensesCategory].name
                                          : ''
                                        }
                              />
                          </div>
                          <div className="inline--inputs__1">
                            <ViewInput
                              label="SubProperty"
                              content= { subProperties && subProperties[exp.expensesSubProperties]
                                ? subProperties[exp.expensesSubProperties].name
                                : ''
                              }
                            />
                          </div>
                          <div className="inline--inputs__1">
                            <ViewInput
                              label="Amount"
                              content= { `$ ${formatNumber(exp.expensesAmount)}` }
                            />
                          </div>
                        </div>
                      </div>
                      {
                        exp.expensesObservation &&
                        <div className="inline--inputs__full">
                          <ViewInput
                            label="Observation"
                            content= { exp.expensesObservation }
                          />
                        </div>
                      }
                    </div>
                  </Paper>
                ))
              }
        </div>
      </FormLayout>
  );
  }
};

ExpenseLanding = connect(mapStateToProps, actions)(ExpenseLanding);
export default ExpenseLanding;
