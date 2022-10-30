/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountScopes } from './AccountScopes';
import type { Callback } from './Callback';
import type { DetailedAccountConfig } from './DetailedAccountConfig';

/**
 * A configuration of an API account
 */
export type AccountConfiguration = {
  scopes?: Array<AccountScopes>;
  callback?: Callback;
  config?: DetailedAccountConfig;
};

