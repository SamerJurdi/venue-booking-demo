interface EventItem {
  title: string;
  type: {key?: string, value?: string};
  organizer: string;
  description: string;
  start: string;
  end: string;
  participantsMandatory: { name: string; status: string }[];
  participantsOptional: { name: string; status: string }[];
}

export type { EventItem }
