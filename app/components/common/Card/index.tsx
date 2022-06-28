import { FC, HTMLProps } from "react";

interface CardProps extends HTMLProps<HTMLDivElement> {
}

const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <div
      {...props}
      className={
        "bg-white border rounded-md shadow p-4 " +
        (props.className ?? "")
      }
    >
      {props.children}
    </div>
  );
};

export default Card;
