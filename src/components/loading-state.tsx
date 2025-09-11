/**
 * The `LoadingState` component displays a loading state with a title and description using Lucide's
 * `Loader2Icon`.
 * @param {Props}  - The code you provided is a React functional component called `LoadingState`. It
 * takes in two props: `title` and `description`, both of type String. Inside the component, it renders
 * a loading state UI with a spinning loader icon (from lucide-react), a title, and a description.
 * @returns The `LoadingState` component is being returned, which displays a loading state UI with a
 * title and description. It includes a spinning loader icon (Loader2Icon) from the lucide-react
 * library, along with the provided title and description text.
 */
import { Loader2Icon } from "lucide-react";

interface Props {
  title: String;
  description: String;
}

const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
