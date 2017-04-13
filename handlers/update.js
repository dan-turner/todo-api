'use strict';

import todos from '../models/todos';

export const update = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const item = await todos.update(event.pathParameters.id, data);

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };
  callback(null, response);
};
