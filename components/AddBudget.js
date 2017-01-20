import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Field, FieldArray, reduxForm } from 'redux-form';
import dateformat from 'dateformat';
import { PrimaryButton, SecondaryButton } from './CoffeeButtons';
import { secondaryColor, forms } from '../styles/general';
import IconButton from 'material-ui/IconButton';
import renderInput from './renderInput';
import RenderSelectInput from './RenderSelectInput';
import Paper from 'material-ui/Paper';
import Loader from './Loader';
import {
  required, email,
  maxLength, minLength, includeNumber,
  includeLowercase, includeUppercase,
  isEqual,
} from '../utils/validations';
import FormLayout from './FormLayout';

const mapStateToProps = (state) => ({
  property: state.property,
  routeHistory: state.routeHistory,
});

class AddBudget extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchPropertyById, params, property } = this.props;
    if (params.propertyId) {
      if (property.propertyDetail) {
        if (property.propertyDetail.id == params.propertyId) {
          return;
        }
      }

      fetchPropertyById(params.propertyId);
    }
  }

  render() {
    const { property } = this.props;
    if (property.loading) {
      return <Loader />;
    };

    const { propertyDetail } = property;
    const { subProperties } = propertyDetail;
    console.log(subProperties, 'subProperties');

    let RenderSpecificExpense = (props) => {
      const { fields } = props;
      if (fields.length == 0) {
        fields.push({});
      }

      console.log(props, 'props');
      console.log(props.meta, 'meta');
      console.log(props.meta.touched, 'touched');
      console.log(props.meta.pristine, 'pristine');
      return (
          <ul>
            {fields.map((member, index) =>
              <li key={index}>
                <Paper style={{ ...forms, marginLeft: 20, marginRight: '20px', paddingBottom: '16px', marginBottom: '16px' }} zDepth={2}>
                  <h4 style={{ textAlign: 'start', width: '100%', position: 'relative', fontSize: '18px' }}>
                    Expense #{ index + 1 }
                    {
                      index != 0 && (
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
                          validate={required}
                          label="Category"
                          items={[{ name: 'Yo', id: 0 }, { name: 'Vos', id: 1 }]}
                        />
                        <Field
                          className="inline--inputs__1"
                          name={`${member}.expensesEmployee`}
                          component={renderInput}
                          type="text"
                          id={ `${member}.expensesEmployee` }
                          label="Employee"
                        />
                      </div>
                      <div className="inline--inputs inline--inputs__1">
                        <Field
                          name={`${member}.expensesAmount`}
                          className="inline--inputs__2"
                          validate={required}
                          component={ renderInput }
                          id={ `${member}.expensesAmount` }
                          label="Amount"
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
                onClick={() => fields.push({})}
              />
            </li>
          </ul>
      );
    };

    let AddBudgetForm = props => (
      <form id="addexpenses" onSubmit= { props.handleSubmit(props.doSubmit) }>
        <div className="inline--inputs">
          <Field
            className="inline--inputs__2"
            name="expensesProperty"
            disabled={ true }
            component={renderInput}
            label="Property"
          />
          <Field
            className="inline--inputs__1"
            name="expensesTotalizer"
            id="expensesTotalizer"
            disabled={ true }
            component={renderInput}
            type="number"
            label="Total"
          />
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
            validate={ [required] }
            label="Date"
          />
        </div>
        <FieldArray name="expensesAbcc" component={ RenderSpecificExpense }/>
        { props.registerError && <div className="form--error"> { props.registerError } </div> }
        <PrimaryButton label="Save" type="submit"
          disabled={ (props.submitting || props.invalid) && !props.pristine }
        />
      </form>
    );

    AddBudgetForm = reduxForm({
      form: 'addexpenses',
      initialValues: {
        expensesDate: dateformat(new Date, 'yyyy-mm-dd'),
        expensesProperty: `${propertyDetail.name}`,
        expensesTotalizer: 0,
      },
    })(AddBudgetForm);

    return (
      <FormLayout title="Add Expenses">
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
