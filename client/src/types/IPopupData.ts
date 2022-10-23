export interface IPopupData {
  id: string;
  styleType: string;
  layoutType: string;
  title: string;
  message: Array<string>;
  remove?: () => Promise<void>;
}
