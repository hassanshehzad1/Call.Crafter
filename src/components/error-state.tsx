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

interface Props {
  title: String;
  description: String;
}

const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <AlertCircleIcon className="size-6 text-red-500" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
