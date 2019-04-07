const winston = require('winston');

module.exports = ({ level }) => {
  winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'gray',
    verbose: 'white',
  });

  return winston.createLogger({
    level,
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
    },
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    )
  });
}
