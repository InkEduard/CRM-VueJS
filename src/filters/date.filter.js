// Фільтри, які можемо експортувати по дефолту 

export default function dateFilter(value, format = 'date') {
  // Форматування дати
  const options = {};

  // налаштування показу дати і часу
  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return new Intl.DateTimeFormat('uk-UA', options).format(new Date(value));
}