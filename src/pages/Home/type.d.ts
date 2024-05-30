export interface projectDetailType {
  id: string;
  name: string;
  time: string;
  description: string;
  cover: string;
  content: string[];
  skill?: string[];
}

export interface projectDetailProps {
  index: number;
  detail: projectDetailType;
}
