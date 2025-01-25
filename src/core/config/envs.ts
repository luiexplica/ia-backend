
import 'dotenv/config';

import * as joi from 'joi';

enum NodeEnv {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

interface EnvVars_I {
  PORT: number;
  JWT_SECRET: string;
  DTO_PREFIX: string;

  // NATS_SERVERS: string[];
  NODE_ENV: NodeEnv;

  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;

  // DB_URL: string;

  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_SECURE: boolean;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  EMAIL_SERVICE: string;
  WEB_URL: string;

}

const envsSchema = joi.object({
  PORT: joi.number().required(),
  JWT_SECRET: joi.string().required(),

  DTO_PREFIX: joi.string().optional(),
  // NATS_SERVERS: joi.array().items(joi.string()),

  NODE_ENV: joi.string().valid(NodeEnv.DEVELOPMENT, NodeEnv.STAGING, NodeEnv.PRODUCTION, NodeEnv.TEST).required(),

  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USERNAME: joi.string().required(),

  // DB_URL: joi.string().required()

  EMAIL_HOST: joi.string().optional(),
  EMAIL_PORT: joi.number().optional(),
  EMAIL_SECURE: joi.boolean().optional(),
  EMAIL_USER: joi.string().optional(),
  EMAIL_PASS: joi.string().optional(),
  EMAIL_SERVICE: joi.string(),
  WEB_URL: joi.string().optional()

}).unknown(true);

const {
  error,
  value
} = envsSchema.validate({
  ...process.env,
  // NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars_I = value;

export const envs = {
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  dtoPrefix: envVars.DTO_PREFIX,
  // natsServers: envVars.NATS_SERVERS,

  nodeEnv: envVars.NODE_ENV,

  db_password: envVars.DB_PASSWORD,
  db_name: envVars.DB_NAME,
  db_host: envVars.DB_HOST,
  db_port: envVars.DB_PORT,
  db_username: envVars.DB_USERNAME,

  // db_url: envVars.DB_URL
  email_host: envVars.EMAIL_HOST,
  email_port: envVars.EMAIL_PORT,
  email_secure: envVars.EMAIL_SECURE,
  email_user: envVars.EMAIL_USER,
  email_pass: envVars.EMAIL_PASS,
  email_service: envVars.EMAIL_SERVICE,
  web_url: envVars.WEB_URL

}