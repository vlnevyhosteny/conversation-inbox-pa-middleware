/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BasicMediaCredentials = {
  /**
   * Determines the type of credentials. Always _basic_.
   */
  type?: 'basic';
  basic?: {
    username: string;
    password: string;
  };
};

