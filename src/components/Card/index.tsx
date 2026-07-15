import { CardButton, CardStamp, CardTitle, CardDescription } from "./style";

export interface CardProps {
  stamp: string;
  title: string;
  description: string;
  onClick: () => void;
}

export function Card({ stamp, title, description, onClick }: CardProps) {
  return (
    <CardButton type="button" onClick={onClick}>
      <CardStamp>{stamp}</CardStamp>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardButton>
  );
}
