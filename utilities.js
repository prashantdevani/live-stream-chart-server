const uuid = require("uuid");

function rendomNumber(min, max) {
  if (min >= max) {
    return new Error("Min number should be less then max number");
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function addSecondes(date, secondes) {
  return new Date(date.getTime() + secondes * 1000);
}

function getData(time, topActiveUsers, fixedVisitor) {
  const dataset = [];
  let redomUsers = rendomNumber(1, topActiveUsers);

  for (let i = 1; i <= redomUsers; i++) {
    const visitorNumber = fixedVisitor ? 0: rendomNumber(1, 100);
    const data = {
      _id: uuid.v4(),
      size: rendomNumber(1, 30),
      visitor_name: fixedVisitor ? `Visitor ${i}` : `Visitor ${visitorNumber}`,
      visitor_id: fixedVisitor ? `visitor_${i}` : `visitor_${visitorNumber}`
    };
    data.date = addSecondes(addSecondes(time, 40), 1).getTime();
    const activityLevelData = {...data, visitor_name:'Activity Level', _id: uuid.v4()}
    dataset.push(activityLevelData, data)
  }
  return dataset;
}

exports.getData = getData;
