export interface IConfirmDialogState {
  title: string;
  message: string;
  showCancelButton: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}