interface Timeblock {
  course: string,
  label: string,
  startTime: string,
  endTime: string,
}

export const Schedule: { [key: string]: Timeblock[] } = {
  'Monday': [{
    course: 'CIS 130',
    label: 'Intro to Python Programming',
    startTime: '11:00',
    endTime: '13:00'
  }],
  'Tuesday': [{
    course: 'CIS 130',
    label: 'Intro to Python Programming',
    startTime: '11:00',
    endTime: '13:00'
  }],
  'Wednesday': [],
  'Thursday': [{
    course: 'CIS 130',
    label: 'Intro to Python Programming',
    startTime: '11:00',
    endTime: '13:00'
  }],
  'Friday': [],
}
