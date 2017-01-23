import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import dateformat from 'dateformat';
import { PrimaryButton, SecondaryButton } from './CoffeeButtons';
import { secondaryColor, forms, subforms, subformHeader } from '../styles/general';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import renderInput from './renderInput';
import RenderSelectInput from './RenderSelectInput';
import Paper from 'material-ui/Paper';
import Loader from './Loader';
import { required, minValue, dateTodayOrLower } from '../utils/validations';
import { aggregateField } from '../utils/arrays';
import FormLayout from './FormLayout';

const mapStateToProps = (state) => ({
  property: state.property,
  expensesCategories: state.expensesCategories,
  routeHistory: state.routeHistory,
  user: state.user,
});

class AddExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.submitExpenses = this.submitExpenses.bind(this);
    this.getPropertyInfo = this.getPropertyInfo.bind(this);
    this.getCategoryInfo = this.getCategoryInfo.bind(this);
  }

  getPropertyInfo() {
    const { fetchPropertyById, params, property, } = this.props;
    if (params.propertyId) {
      if (property.propertyDetail) {
        if (property.propertyDetail.id == params.propertyId) {
          return;
        }
      }

      fetchPropertyById(params.propertyId);
    }
  }

  getCategoryInfo() {
    const { expensesCategories, fetchExpensesCategories } = this.props;
    if (expensesCategories.detail.length == 0) {
      fetchExpensesCategories();
    }
  }

  componentWillMount() {
    this.getPropertyInfo();
    this.getCategoryInfo();
  }

  componentWillUpdate(nextProps, nextState) {
    this.getPropertyInfo();
    this.getCategoryInfo();
  }

  submitExpenses(expenses) {
    let newExpenses = { ...expenses };
    const { propertyId } = this.props.params;
    const { user, saveExpenses, property } = this.props;
    const total = newExpenses.expenses.reduce((prev, act) => {
      if (act.expensesAmount && act.expensesAmount > 0) {
        return prev + parseInt(act.expensesAmount);
      }

      return prev;
    }, 0);

    const userDet = { email: user.userInfo.email, uid: user.userInfo.uid };
    if (!newExpenses.expensesName) {
      newExpenses.expensesName =
        `Expenses for ${property.propertyDetail.name} on ${newExpenses.expensesDate}`;
    }

    const aggregatedCategories = aggregateField(
      newExpenses.expenses, 'expensesCategory',
      'expensesAmount'
    );

    let aggregatedSubProperties = aggregateField(
      newExpenses.expenses, 'expensesSubProperties',
      'expensesAmount', 0
    );
    const newDate = new Date(expenses.expensesDate);
    newDate.setDate(newDate.getDate() + 1);
    newExpenses.expensesDate = newDate.getTime() / 1000;
    const expensesReadyToSubmit = {
      ...newExpenses, total,
      user: userDet,
      aggregatedCategories,
      aggregatedSubProperties,
    };

    saveExpenses(propertyId, expensesReadyToSubmit);
  }

  componentDidUpdate() {
    const el = document.getElementById('expensesName');
    if (el) {
      el.focus();
    }
  }

  render() {
    const { property, expensesCategories, addExpensesValues, saveExpenses } = this.props;

    if (property.loading) {
      return <Loader />;
    };

    const { propertyDetail } = property;
    const { subProperties } = propertyDetail;

    class RenderSpecificExpense extends React.Component {
      constructor(props) {
        super(props);
      }

      componentDidUpdate(prevProps, prevState) {
        const { fields } = this.props;
        if (prevProps.fields.length == fields.length || fields.length <= 1) {
          return;
        } else {
          const id = `${fields.name}[${fields.length - 1}].expensesCategoryMenu`;
          const el = document.getElementById(id);
          el.getElementsByClassName('md-select-field')[0].focus();
        }
      }

      render() {
        const { fields, ...props } = this.props;
        if (fields.length == 0) {
          fields.push({});
        }

        let invalid = false;
        let allFields = fields.get(fields.length - 1);
        if (!allFields
          || allFields.expensesCategory == undefined
          || !allFields.expensesSubProperties  == undefined
          || allFields.expensesAmount == undefined
        ) {
          invalid = true;
        }

        return (
            <ul>
              {fields.map((member, index) =>
                <li key={index}>
                  { props.meta.error && <span>{props.meta.error}</span>}
                  <Paper style={{ ...forms, ...subforms }} zDepth={2}>
                    <h4 style={ subformHeader }>
                      Expense #{ index + 1 }
                      {
                        (index != 0 || fields.length > 1) && (
                          <IconButton
                            style={{ right: 0, position: 'absolute' }}
                            iconClassName="fa fa-trash"
                            iconStyle={ secondaryColor }
                            onClick={() => fields.remove(index)}
                          />
                        )
                      }
                    </h4>
                    <div className="general--form__inputs">
                      <div className="inline--inputs">
                        <div className="inline--inputs inline--inputs__1">
                          <Field
                            className="inline--inputs__1"
                            name={`${member}.expensesCategory`}
                            component={ RenderSelectInput }
                            id={ `${member}.expensesCategory` }
                            label="Category"
                            validate={required}
                            items={expensesCategories.detail}
                          />
                          <Field
                            className="inline--inputs__1"
                            name={`${member}.expensesSubProperties`}
                            component={ RenderSelectInput }
                            id={ `${member}.expensesSubProperties` }
                            label="SubProperty"
                            validate={ required }
                            items={ subProperties }
                          />
                          <Field
                            name={`${member}.expensesAmount`}
                            className="inline--inputs__2"
                            component={ renderInput }
                            id={ `${member}.expensesAmount` }
                            label="Amount"
                            validate={[required, minValue(0)]}
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="inline--inputs__full">
                        <Field
                          name={`${member}.expensesObservation`}
                          component={renderInput}
                          type="text"
                          multiLine={true}
                          rows={2}
                          rowsMax={4}
                          id={ `${member}.expensesObservation` }
                          label="Observation"
                        />
                      </div>
                    </div>

                  </Paper>
                </li>
              )}
              <li>
                <SecondaryButton
                  label="Add Another Expense"
                  disabled={ invalid }
                  onClick={() => fields.push({})}
                />
              </li>
            </ul>
        );
      }
    }

    let AddExpensesForm = props => {
      let total = 0;
      if (props.expensesData) {
        total = props.expensesData.reduce((prev, act) => {
          if (act.expensesAmount && act.expensesAmount > 0) {
            return prev + parseInt(act.expensesAmount);
          }

          return prev;
        }, 0);
      }

      return (
        <form id="addexpenses" onSubmit= { props.handleSubmit(props.doSubmit) }>
          <div className="inline--inputs">
            <div className="inline--inputs__1">
              <h3 style={{ fontSize: '30px', fontWeight: 800 }} >Total: {total}</h3>
              <Divider />
            </div>
          </div>
          <div className="inline--inputs">
            <Field
              className="inline--inputs__2"
              name="expensesName"
              component={renderInput}
              type="text"
              id="expensesName"
              label="Name"
              placeholder={
                `Expenses for ${propertyDetail.name} on ${dateformat(new Date, 'dd-mm-yyyy')}`
              }
            />
            <Field
              className="inline--inputs__1"
              name="expensesDate"
              component={renderInput}
              type="date"
              id="expensesDate"
              validate={ [required, dateTodayOrLower] }
              label="Date"
            />
          </div>
          <FieldArray name="expenses" component={ RenderSpecificExpense } />
          { props.registerError && <div className="form--error"> { props.registerError } </div> }
          <div className="inline--inputs__1">
            <h2 style={{ fontSize: '30px', fontWeight: 800 }} >Total: {total}</h2>
            <Divider />
          </div>
          <PrimaryButton label="Save" type="submit"
          />
        </form>
      );
    };

    AddExpensesForm = reduxForm({
      form: 'addexpenses',
      initialValues: {
        expensesDate: dateformat(new Date, 'yyyy-mm-dd'),
        expenses: [],
      },
    })(AddExpensesForm);
    const selector = formValueSelector('addexpenses');
    AddExpensesForm = connect(
      state => {
        const expensesData = selector(state, 'expenses');
        return { expensesData };
      })(AddExpensesForm);

    return (
      <FormLayout title={`Add Expenses to ${propertyDetail.name}`}>
        <div className="gene ral--form__inputs">
          <AddExpensesForm
            doSubmit={ (value) => this.submitExpenses(value) }
            registerError= { '' }
          />
        </div>
      </FormLayout>
    );
  }
};

AddExpenses = connect(mapStateToProps, actions)(AddExpenses);
export default AddExpenses;
