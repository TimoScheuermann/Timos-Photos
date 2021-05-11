export function copyToClipboard(text: string): void {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

export function convertSize(size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const s = size / Math.pow(1024, i);
  return +s.toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
