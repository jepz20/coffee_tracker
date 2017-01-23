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
import { capitalize } from '../utils/strings';
import { getTimestampFromStr } from '../utils/date';
import FormLayout from './FormLayout';

const mapStateToProps = (state) => ({
  property: state.property,
  eventTypes: state.eventTypes,
  eventFrequencies: state.eventFrequencies,
  user: state.user,
});

class AddEvents extends React.Component {
  constructor(props) {
    super(props);
    this.submitEvents = this.submitEvents.bind(this);
  }

  submitEvents(event) {
    const { propertyId } = this.props.params;
    const { user, saveEvent, property, eventFrequencies } = this.props;
    const userDet = { email: user.userInfo.email, uid: user.userInfo.uid };

    let newEvent = { ...event };

    const addUnitsToDate = (dateToAdd, unitType, unitValue) => {
      let newDate = dateToAdd;
      switch (unitType) {
        case 'days':
          newDate.setDate(newDate.getDate() + unitValue);
          break;
        case 'weeks':
          newDate.setDate(newDate.getDate() + (unitValue * 7));
          break;
        case 'months':
          newDate.setMonth(newDate.getMonth() + unitValue);
          break;
        case 'years':
          newDate.setYear(newDate.getYear() + unitValue);
          break;
        default:
          newDate;
          break;
      }
      return new Date(newDate);
    };

    let frequencyMatch = eventFrequencies.filter(freq => freq.id == newEvent.eventsFrequency);
    frequencyMatch = frequencyMatch ? frequencyMatch[0] : undefined;

    const newDate = getTimestampFromStr(newEvent.eventsExecutionDate);
    newEvent.eventsExecutionDate = newDate;
    if (frequencyMatch) {
      if (frequencyMatch.repeat) {
        const frequencyNumber = parseInt(newEvent.eventsFrequencyNumber);
        const nextExecution = addUnitsToDate(
          new Date(newDate * 1000),
          frequencyMatch.unit,
          frequencyNumber
        );
        newEvent.nextExecution = nextExecution.getTime() / 1000;
      }
    }

    const eventReadyToSubmit = {
      ...newEvent,
      user: userDet,
    };

    saveEvent(propertyId, eventReadyToSubmit);
  }

  componentDidUpdate() {
    const el = document.getElementById('eventsExecutionDate');
    if (el) {
      el.focus();
    }
  }

  render() {
    const { property,  saveEvents, eventTypes, eventFrequencies } = this.props;

    if (property.loading) {
      return <Loader />;
    };

    const { propertyDetail } = property;
    const { subProperties } = propertyDetail;

    let AddEventsForm = props => {
      const { frequencyData } = props;
      let frequencyMatch = eventFrequencies.filter(freq => freq.id == frequencyData);
      frequencyMatch = frequencyMatch ? frequencyMatch[0] : undefined;
      const showFrequencyNumber = frequencyMatch && frequencyMatch.repeat
        ? true
        : false;

      return (
        <form id="addevent" onSubmit= { props.handleSubmit(props.doSubmit) }>
          <div className="inline--inputs">
            <Field
              className="inline--inputs__1"
              name="eventsExecutionDate"
              component={renderInput}
              type="date"
              id="eventsExecutionDate"
              validate={ [required] }
              label="Date"
            />
            <Field
              className="inline--inputs__1"
              name="eventsType"
              component={ RenderSelectInput }
              id="eventsType"
              label="Type"
              validate={required}
              items={ eventTypes}
            />
            <Field
              className="inline--inputs__1"
              name="eventsSubproperty"
              component={ RenderSelectInput }
              id="eventsSubproperty"
              label="SubProperty"
              validate={required}
              items={ subProperties}
            />
          </div>
          <div className="inline--inputs">
            <Field
              className="inline--inputs__1"
              name="eventsFrequency"
              component={ RenderSelectInput }
              id="eventsFrequency"
              label="Frequency"
              validate={required}
              items={ eventFrequencies }
            />
            <div className="inline--inputs__1">
              {
                showFrequencyNumber &&
                <Field
                  className="inline--inputs__1"
                  name="eventsFrequencyNumber"
                  component={renderInput}
                  type="number"
                  id="eventsFrequencyNumber"
                  validate={ [required, minValue(0)] }
                  label={capitalize(frequencyMatch.unit)}
                />
              }
            </div>
          </div>
          <div className="inline--inputs__full">
            <Field
              name="eventsDescription"
              component={renderInput}
              type="text"
              multiLine={true}
              rows={2}
              rowsMax={4}
              id="eventsDescription"
              label="Description"
            />
          </div>
          { props.registerError && <div className="form--error"> { props.registerError } </div> }
          <PrimaryButton label="Save" type="submit"
          />
        </form>
      );
    };

    AddEventsForm = reduxForm({
      form: 'addEvents',
      initialValues: {
        eventsExecutionDate: dateformat(new Date, 'yyyy-mm-dd'),
      },
    })(AddEventsForm);

    const selector = formValueSelector('addEvents');
    AddEventsForm = connect(
      state => {
        const frequencyData = selector(state, 'eventsFrequency');
        return { frequencyData };
      })(AddEventsForm);

    return (
      <FormLayout title={`Add Event to ${propertyDetail.name}`}>
        <div className="general--form__inputs">
          <AddEventsForm
            doSubmit={ (value) => this.submitEvents(value) }
            registerError= { '' }
          />
        </div>
      </FormLayout>
    );
  }
};

AddEvents = connect(mapStateToProps, actions)(AddEvents);
export default AddEvents;
