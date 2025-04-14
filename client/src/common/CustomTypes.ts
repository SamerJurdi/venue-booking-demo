interface EventItem {
  title: string;
  type: string;
  organizer: string;
  description: string;
  start: string;
  end: string;
  participantsMandatory: { name: string; status: string }[];
  participantsOptional: { name: string; status: string }[];
}

export type { EventItem }
