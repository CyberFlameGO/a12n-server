import { OAuth2Token } from '../types';
import { OAuth2Client } from '../../oauth2-client/types';

import { stringify } from 'csv-stringify/sync';

export function activeSessions(tokens: OAuth2Token[], clients: Map<number, OAuth2Client|null>): string {

  return stringify(
    tokens.map( token => {
      return [
        token.clientId===0 ? 'System generated' : clients.get(token.clientId)?.app.nickname,
        token.grantType,
        new Date(token.refreshTokenExpires*1000).toISOString(),
        token.scope?.join(' '),
      ];
    }),
    {
      header: true,
      columns: [
        'OAuth2 Client',
        'Grant Type',
        'Refresh token expires',
        'Scope',
      ],
    }
  );

}
