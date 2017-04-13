'use strict';

import todos from '../models/todos';

export const create = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const item = await todos.create(data);

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };
  callback(null, response);
};
