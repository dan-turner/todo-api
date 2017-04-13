'use strict';

import todos from '../models/todos';

export const list = async (event, context, callback) => {
  const result = await todos.list();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
  callback(null, response);
};
