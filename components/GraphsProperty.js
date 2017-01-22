import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CustomChart from './CustomChart';
import InfoCard from './InfoCard';
import Loader from './Loader';
import { formatNumber, pad } from '../utils/numbers';

const MONTHS = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December',
];

const mapStateToProps = (state) => ({
  property: state.property,
});

class GraphsProperty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { property } = this.props;
    if (property.loading) {
      return <Loader />;
    }

    const testData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          data: [10, 15, 1, 30, 20, 21, 17],
        },
      ],
    };

    const { propertyDetail } = property;
    const { map, subProperties, expenses, categories, expensesByMonth } = propertyDetail;
    const totalExpenses = map.coordinates.coords[0].info.totalExpenses;

    //Generate subProperties Info
    const subPropertiesData = { labels: [], datasets: [{ data: [] }] };
    map.coordinates.coords.forEach(subp => {
      subPropertiesData.labels.push(subp.info.name);
      subPropertiesData.datasets[0].data.push(subp.info.totalExpenses);
    });

    //Generate Categories Info
    const categoriesData = [];
    if (categories) {
      Object.keys(categories).forEach(key => {
        if (categories[key].totalExpenses) {
          categoriesData.push({
            value: (categories[key].totalExpenses),
            label: categories[key].name,
          });
        }
      });
    }

    //ExpensesByMonth
    const expensesByMonthData = { labels: [], datasets: [{ data: [] }] };

    for (var i = 0; i < 6; i++) {
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - i));
      expensesByMonthData.labels.unshift(MONTHS[lastMonth.getMonth()]);
      const key = `${pad(lastMonth.getMonth() + 1, 2)}${lastMonth.getFullYear()}`;
      let value = 0;
      if (expensesByMonth) {
        if (expensesByMonth[key]) {
          value = expensesByMonth[key].totalExpenses;
        }
      }

      expensesByMonthData.datasets[0].data.unshift(value);
    };

    return (
      <div>
        <div className='inline--inputs'>
          <InfoCard
            title='Total Expenses'>
            {
              property.loading
              ? <Loader />
              :
                <div>
                  $ {formatNumber(totalExpenses)}
                </div>
            }
          </InfoCard>
        </div>
        <div className="graphs__upper">
            <div className="graphs__upper__left">
              <CustomChart
                chartType="bar"
                title="Expenses By Subproperties"
                data={ subPropertiesData }
              />
            </div>
            {
              categories &&
              <div className="graphs__upper__right">
                <CustomChart
                  chartType="pie"
                  title="Expenses By Category"
                  data={ categoriesData }
                />
              </div>
            }
        </div>
        <div style={ { width: '100%' } }>
          <CustomChart
            chartType="line"
            title="Expenses By Month"
            data={ expensesByMonthData }
          />
        </div>
      </div>
    );
  }
}

GraphsProperty = connect(mapStateToProps, actions)(GraphsProperty);

export default GraphsProperty;
