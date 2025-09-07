import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Code Details
/**
 * 1. Imports
Yeh lines external libraries import karti hain jo cn function ko kaam karne deta hai.
tsximport { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

clsx: Ek utility library jo multiple class names ko ek single string mein combine karta hai, jaise conditional classes handle karne ke liye.
ClassValue: clsx ka type jo kisi bhi value ko class ke roop mein accept karta hai (string, array, object, etc.).
twMerge: Tailwind CSS ke liye ek function jo duplicate ya conflicting classes ko smartly merge karta hai (e.g., text-red-500 text-blue-500 ko resolve karta hai).

2. Function Definition
Yeh ek utility function hai jo class names ko process karta hai.
tsxexport function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cn: Yeh function cn naam se export hota hai taaki dusre files mein use ho sake.
...inputs: ClassValue[]: Rest parameter jo multiple ClassValue (class names ya related values) accept karta hai.
clsx(inputs): Sabhi inputs ko ek string mein combine karta hai (e.g., ["bg-red-500", { "text-bold": true }, "p-4"]).
twMerge(...): clsx se aayi string ko Tailwind ke rules ke hisab se refine karta hai, jaise conflicting styles ko handle karke ek clean output deta hai.
Return: Final merged class string jo component mein use ho sakti hai.

Kyun Yeh Code?

React ya Tailwind projects mein aksar class names conditional ya multiple sources se aate hain (e.g., props se, default styles se).
clsx conditional logic handle karta hai, aur twMerge Tailwind ke saath compatibility deta hai.

Complete Example from Scratch
Ek naya file utils.ts banayein:
tsximport { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage example
import React from "react";

const Button = ({ isPrimary, className }: { isPrimary?: boolean; className?: string }) => {
  const classes = cn(
    "px-4 py-2 rounded", // Default classes
    isPrimary && "bg-blue-500 text-white", // Conditional class
    className // Dynamic class from props
  );

  return <button className={classes}>Click Me</button>;
};

const App = () => {
  return (
    <div>
      <Button isPrimary={true} className="shadow-lg" />
      <Button className="bg-green-500" />
    </div>
  );
};

export default App;
Dry Run

First Button:

inputs = ["px-4 py-2 rounded", { "bg-blue-500 text-white": true }, "shadow-lg"]
clsx → "px-4 py-2 rounded bg-blue-500 text-white shadow-lg"
twMerge → "px-4 py-2 rounded bg-blue-500 text-white shadow-lg" (no conflicts)
Output: Button blue background, white text, shadow, padding, aur rounded corners ke saath.


Second Button:

inputs = ["px-4 py-2 rounded", { "bg-blue-500 text-white": false }, "bg-green-500"]
clsx → "px-4 py-2 rounded bg-green-500" (conditional class nahi liya)
twMerge → "px-4 py-2 rounded bg-green-500" (green override karta hai)
Output: Button green background, padding, aur rounded corners ke saath.



Kyun Samajh Nahi Aaya?

Complex Libraries: clsx aur twMerge ka kaam pehli baar samajhna mushkil ho sakta hai.
No Context: Agar aapne in libraries ka use nahi dekha, to syntax alien lag sakta hai.
 */