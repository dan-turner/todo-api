'use strict';

import uuid from 'uuid';
import dynamodb from './dynamodb';

export const TableName = `${process.env.DYNAMODB_TABLE}`;

const create = async (data) => {
  const timestamp = new Date().getTime();

  if (typeof data.text !== 'string') {
    throw new Error('Couldn\'t create the item.');
  }

  const params = {
    TableName: TableName,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  const result = await dynamodb.put(params).promise();

  return params.Item;
};

const get = async (id) => {
  const params = {
    TableName: TableName,
    Key: {
      id: id,
    },
  };

  // fetch todo from the database
  const result = await dynamodb.get(params).promise();
  return result.Item;
}

const list = async () => {
  console.log('models/todos: list()')
  const params = {
    TableName: TableName,
  };

  // fetch all todos from the database
  const result = await dynamodb.scan(params).promise();
  return result.Items;
};

const remove = async (id) => {
  const params = {
    TableName: TableName,
    Key: {
      id: id,
    },
  };

  // delete the todo from the database
  await dynamodb.delete(params).promise();
};

const update = async (data) => {
  const timestamp = new Date().getTime();

  // validation
  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  const params = {
    TableName: TableName,
    Key: {
      id: data.id,
    },
    ExpressionAttributeNames: {
      '#todo_text': 'text',
    },
    ExpressionAttributeValues: {
      ':text': data.text,
      ':checked': data.checked,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  const result = await dynamodb.update(params).promise();
  return result.Attributes;
}

export default { create, get, list, remove, update }
