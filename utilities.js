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

function getData(time, topActiveUsers, fixedUsers) {
  const dataset = [];
  let redomUsers = rendomNumber(1, topActiveUsers);

 /*  if (fixedUsers) {
    redomUsers = topActiveUsers;
  } */

  for (let i = 1; i <= redomUsers; i++) {
    const data = {
      _id: uuid.v4(),
      size: rendomNumber(1, 30),
      visiter_name: fixedUsers ? `user_${i}` : `user_${rendomNumber(1, 100)}`,
    };
    data.date = addSecondes(addSecondes(time, 30), 1).getTime();
    dataset.push(data);
  }
  return dataset;
}

exports.getData = getData;
