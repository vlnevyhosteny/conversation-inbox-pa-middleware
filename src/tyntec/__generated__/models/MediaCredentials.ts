/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasicMediaCredentials } from './BasicMediaCredentials';
import type { OAuth2MediaCredentials } from './OAuth2MediaCredentials';

/**
 * Credentials to download media from your remote service
 */
export type MediaCredentials = (OAuth2MediaCredentials | BasicMediaCredentials);

