import { MessageResponse, Problem } from './__generated__';

export function isMessageResponse(
  response: MessageResponse | Problem,
): response is MessageResponse {
  const possibly = response as MessageResponse;

  return possibly.timestamp !== undefined && possibly.messageId !== undefined;
}
