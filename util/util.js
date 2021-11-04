var waitFunction= function (time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

module.exports = {
  waitFunction: waitFunction
}