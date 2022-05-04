import { RandomEvents } from "../../Entities/RandomEvents";

export async function getRandomMessageEvent() {
  const events = await RandomEvents.find();
  const randomEvent = events[Math.floor(Math.random() * events.length)];

  return randomEvent;
}
