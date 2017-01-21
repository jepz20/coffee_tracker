export const aggregateField = (object, fieldToAggregate, fieldToAdd, addTo=-1) => (
  object.reduce((prev, act, index) => {

    if (prev[act[fieldToAggregate]]) {
      prev[act[fieldToAggregate]] = prev[act[fieldToAggregate]] + parseInt(act[fieldToAdd]);
    } else {
      prev[act[fieldToAggregate]] = parseInt(act[fieldToAdd]);
    }

    if (addTo != act[fieldToAggregate]) {
      if (prev[addTo]) {
        prev[addTo] = prev[addTo] + parseInt(act[fieldToAdd]);
      } else {
        prev[addTo] = parseInt(act[fieldToAdd]);
      }
    }

    return prev;
  }, {})
);
