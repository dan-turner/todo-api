'use strict';

import todos from '../models/todos';

export const get = async (event, context, callback) => {
  const item = await todos.get(event.pathParameters.id);

  let response = {
    statusCode: 404
  }

  if(item) {
    response = {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  }
  callback(null, response);
};
