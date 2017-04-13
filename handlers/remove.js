'use strict';

import todos from '../models/todos';

export const remove = async (event, context, callback) => {
  const item = await todos.remove(event.pathParameters.id);

  const response = {
    statusCode: 200,
    body: JSON.stringify({}),
  };
  callback(null, response);
};
