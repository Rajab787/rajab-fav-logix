export interface ChatItem {
  initial: string;
  name: string;
  message: string;
  time: string;
  color: string; // Tailwind class for background color
}

export const chatData: ChatItem[] = [
  {
    initial: 'O',
    name: 'Olivia McKinsey',
    message: "Oh my god 😍 I'll try it ASAP, thank...",
    time: '23:23',
    color: 'bg-purple-400',
  },
  {
    initial: 'E',
    name: 'Sara Williams',
    message: 'Good Evening, Emily. Hope you are...',
    time: '23:16',
    color: 'bg-yellow-400',
  },
  {
    initial: 'F',
    name: 'Frank Thompson',
    message: 'Thank you for signing up Frank! If t...',
    time: '22:28',
    color: 'bg-blue-400',
  },
  {
    initial: 'G',
    name: 'Grace Lee',
    message: 'I am sending you the report right a...',
    time: '20:43',
    color: 'bg-orange-400',
  },
  {
    initial: 'H',
    name: 'Henry Adams',
    message: 'Thank you for filling out our survey!',
    time: '17:37',
    color: 'bg-orange-500',
  },
  {
    initial: 'I',
    name: 'Isabella Martinez',
    message: 'I will update you soon Isabella!',
    time: '16:01',
    color: 'bg-pink-400',
  },
  {
    initial: 'J',
    name: 'James Brown',
    message: "Hello James! Let's collaborate on ...",
    time: '13:44',
    color: 'bg-purple-500',
  },
  {
    initial: 'K',
    name: 'Katherine White',
    message: 'Hi Katherine, looking forward to our...',
    time: '09:02',
    color: 'bg-yellow-500',
  },
  {
    initial: 'L',
    name: 'Lucas Green',
    message: 'Hey Lucas! Ready for the holiday ...',
    time: 'Yesterday',
    color: 'bg-blue-500',
  },
];