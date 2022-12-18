export interface INotification {
  title: string;
  body: string;
  type?: 'normal' | 'error';
  clickcallback?: (arg0: INotification) => void;
}
