/**
 * The `EmptyState` component in TypeScript React displays an image with a title and description in a
 * centered layout.
 * @param {Props}  - The code you provided is a React component called `EmptyState` that displays an
 * empty state with a title and description. It includes an image, title, and description within a flex
 * container. The title is displayed in a larger font size, and the description is shown below it.
 * @returns The `EmptyState` component is being returned, which displays an empty state with a title
 * and description. It includes an image, the title in a larger font size, and the description below
 * it.
 */
/**
 * The `ErrorState` component in TypeScript React displays an error message with a title and
 * description using an alert icon.
 * @param {Props}  - The code you provided is a React component called `ErrorState` that displays an
 * error message with a title and description. It uses the `AlertCircleIcon` from the "lucide-react"
 * library to show an alert icon next to the error message.
 * @returns The `ErrorState` component is being returned, which displays an error state with a title
 * and description. It includes an alert circle icon, the title in a larger font size, and the
 * description below it.
 */
import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  title: String;
  description: String;
}

const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src="/logo.svg" alt="Empty" width={240} height={240}/>
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
