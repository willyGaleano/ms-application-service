import { Environment, NodeEnv } from '@config/enums';

export const nodeEnvValues = [NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION] as const;

export const environmentValues = [
  Environment.LOCAL,
  Environment.QA,
  Environment.STG,
  Environment.PRD,
] as const;
