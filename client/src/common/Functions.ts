const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getTypeBgColor100(type?: string): string {
  const colors: Record<string, string> = {
    Lecture: 'bg-blue-100',
    Conference: 'bg-yellow-100',
    Meeting: 'bg-green-100',
    Event: 'bg-purple-100',
    Disabled: 'bg-gray-100',
  }
  return (type && colors[type]) || 'bg-gray-200'
}

function getTypeBgColor200(type?: string): string {
  const colors: Record<string, string> = {
    Lecture: 'bg-blue-200',
    Conference: 'bg-yellow-200',
    Meeting: 'bg-green-200',
    Event: 'bg-purple-200',
    Disabled: 'bg-gray-200',
  }
  return (type && colors[type]) || 'bg-gray-200'
}

function getTypeTextColor700(type?: string): string {
  const colors: Record<string, string> = {
    Lecture: 'text-blue-700',
    Conference: 'text-yellow-700',
    Meeting: 'text-green-700',
    Event: 'text-purple-700',
    Disabled: 'text-gray-700',
  }
  return (type && colors[type]) || 'bg-gray-700'
}

function getTypeTextColor800(type?: string): string {
  const colors: Record<string, string> = {
    Lecture: 'text-blue-800',
    Conference: 'text-yellow-800',
    Meeting: 'text-green-800',
    Event: 'text-purple-800',
    Disabled: 'text-gray-800',
  }
  return (type && colors[type]) || 'bg-gray-800'
}

export {
  formatTime,
  formatDate,
  getTypeBgColor100,
  getTypeBgColor200,
  getTypeTextColor700,
  getTypeTextColor800,
}
