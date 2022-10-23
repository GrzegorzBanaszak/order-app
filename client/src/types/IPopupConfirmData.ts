export interface IPopupConfirmData {
  remove: () => Promise<void>;
  messages: Array<string>;
}
