export interface INotification {
  title: string;
  body: string;
  type: 'move-file' | 'warn' | 'error';
  clickcallback?: (arg0: INotification) => void;
}
