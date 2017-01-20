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
import FormLayout from './FormLayout';

const validate = values => {
  const errors = {};

  if (!values.expenses || !values.expenses.length) {
    errors.expenses = { _error: 'At least one Expense must be entered' };
  } else {
    const expensesArrayErrors = [];
    values.expenses.forEach((member, memberIndex) => {
      const memberErrors = {};
    });

    if (expensesArrayErrors.length) {
      errors.expenses = expensesArrayErrors;
      console.log(errors.expenses);
    }

  }

  return errors;
};

const mapStateToProps = (state) => ({
  property: state.property,
  expensesCategories: state.expensesCategories,
  routeHistory: state.routeHistory,
});

class AddBudget extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchPropertyById, expensesCategories,
      fetchExpensesCategories, params, property, } = this.props;
    if (params.propertyId) {
      if (property.propertyDetail) {
        if (property.propertyDetail.id == params.propertyId) {
          return;
        }
      }

      fetchPropertyById(params.propertyId);
    }

    if (expensesCategories.detail.length == 0) {
      fetchExpensesCategories();
    }
  }

  componentDidUpdate() {
    const el = document.getElementById('expensesName');
    if (el) {
      el.focus();
    }
  }

  render() {
    const { property, expensesCategories, addExpensesValues } = this.props;

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
                        </div>
                        <div className="inline--inputs inline--inputs__1">
                          <Field
                            name={`${member}.expensesAmount`}
                            className="inline--inputs__2"
                            component={ renderInput }
                            id={ `${member}.expensesAmount` }
                            label="Amount"
                            validate={[required, minValue(0)]}
                            type="number"
                          />
                          <Field
                            className="inline--inputs__2"
                            name={`${member}.expensesObservation`}
                            component={renderInput}
                            type="text"
                            id={ `${member}.expensesObservation` }
                            label="Observation"
                          />
                        </div>
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

    let AddBudgetForm = props => {
      let total = 0;
      if (props.expensesData) {
        total = props.expensesData.reduce((prev, act) => {
          if (act.expensesAmount && act.expensesAmount > 0) {
            return prev + parseInt(act.expensesAmount);
          }

          return prev;
        }, 0);
      }

      return <form id="addexpenses" onSubmit= { props.handleSubmit(props.doSubmit) }>
        <div className="inline--inputs">
          <div className="inline--inputs__1">
            <h2 style={{ fontSize: '30px', fontWeight: 800 }} >Total: {total}</h2>
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
    };

    AddBudgetForm = reduxForm({
      form: 'addexpenses',
      validate,
      initialValues: {
        expensesDate: dateformat(new Date, 'yyyy-mm-dd'),
        expenses: [],
      },
    })(AddBudgetForm);
    const selector = formValueSelector('addexpenses');
    AddBudgetForm = connect(
      state => {
        const expensesData = selector(state, 'expenses');
        return { expensesData };
      })(AddBudgetForm);

    return (
      <FormLayout title={`Add Expenses to ${propertyDetail.name}`}>
        <AddBudgetForm
          doSubmit={ () => console.log('ol') }
          registerError= { '' }
        />
      </FormLayout>
    );
  }
};

AddBudget = connect(mapStateToProps, actions)(AddBudget);
export default AddBudget;
