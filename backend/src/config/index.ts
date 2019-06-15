import { forEach } from 'lodash';
import config from './config';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const applyConfigValue = (value:any, key: string = '') => {
  if (value && typeof value !== 'object') return process.env[key] = value;

  forEach(value, (item, key) => applyConfigValue(item, key));
};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  applyConfigValue(config);

module.exports = null;