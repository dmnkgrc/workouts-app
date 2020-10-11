import { format } from 'date-fns';

export function formatDate(date: string | Date | number) {
  return format(new Date(date), 'dd MMM yyyy');
}
