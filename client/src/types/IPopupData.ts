export enum PopupTypeEnum {
  DISPLAY_MESSAGES = "display-messages",
  CONFIRM_REMOVE = "confirm-remove",
}

export interface IPopupData {
  id: string;
  type: PopupTypeEnum;
  data: any;
}
