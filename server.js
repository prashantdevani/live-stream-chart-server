const HAPI = require("@hapi/hapi");
const HAPIWebSocket = require("hapi-plugin-websocket");
const Joi = require("Joi");
const utilities = require("./utilities");

(async () => {
  /*  create new HAPI service  */
  const server = new HAPI.Server({ address: "127.0.0.1", port: 12345 });

  /*  register HAPI plugins  */
  await server.register(HAPIWebSocket);

  /*  provide combined REST/WebSocket route  */
  server.route({
    method: "POST",
    path: "/chartData",
    options: {
      validate: {
        payload: Joi.object({
          startTime: Joi.date().default(Date.now()).optional(),
          endTime: Joi.date().default(Date.now()).optional(),
          topActiveUsers: Joi.number().default(5).optional(),
          fixedVisitor: Joi.bool().default(false).optional(),
        }),
      },
      payload: { output: "data", parse: true, allow: "application/json" },
      plugins: { websocket: true },
      cors: {
        headers: [
          'Accept',
          'Authorization',
          'Content-Type',
          'If-None-Match',
          'Accept-language',
        ],
      },
    },
    handler: (request, h) => {
      const data = request.payload 
      const dummyChartData = utilities.getData(data.startTime, data.topActiveUsers, data.fixedVisitor)
      return dummyChartData;
    },
  });

  /*  start the HAPI service  */
  await server.start();
  console.log(`Server started : ${server.info.uri}`)
})().catch((err) => {
  /* eslint no-console: off */
  console.log(`ERROR: ${err}`);
});
