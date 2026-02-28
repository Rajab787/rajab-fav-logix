// src/components/data/ChatData.ts

// Message Interface
export interface Message {
  sender: "user" | "other";
  text: string;
  time: string;
  seen?: boolean;
}

// Chat Messages
export const chatMessages: Message[] = [
  {
    sender: "other",
    text: "Hey! How are you?",
    time: "10:10 AM",
  },
  {
    sender: "user",
    text: "I’m good! What about you?",
    time: "10:12 AM",
    seen: true,
  },
  {
    sender: "other",
    text: "All good here 👍",
    time: "10:13 AM",
  },
];

// Header Icons
export interface HeaderButton {
  icon: string;
}

export const headerButtons: HeaderButton[] = [
  {
    icon: "/main-img/qlementine-icons_menu-dots-16.png",
  },
  {
    icon: "/main-img/Frame 134.svg",
  },
  {
    icon: "/icons/inbox.png",
  },
];
