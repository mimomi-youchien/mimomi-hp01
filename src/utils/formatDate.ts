import { format, parseISO } from 'date-fns'; // date-fnsのインストールコマンド: npm install date-fns

export const formatNewsDate = (dateString: string | undefined | null): string => {
  if (!dateString) return '日付未定';
  try {
    return format(parseISO(dateString), 'yyyy.MM.dd');
  } catch {
    return '日付エラー';
  }
};

export const toMachineDate = (dateString: string | undefined | null): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toISOString();
  } catch {
    return '';
  }
};
