export enum NetworkPaticipantType {
  BAP = "BAP",
  BPP = "BPP",
}

export type SubscriberDetail = {
  "subscriber_id": string,
  "subscriber_url"?: string,
  "type": NetworkPaticipantType,
  "signing_public_key": string,
  "valid_until": string,
};

export interface Locals {
  sender?: SubscriberDetail;
  rawBody?: any
}