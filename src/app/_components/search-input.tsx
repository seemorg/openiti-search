"use client";

import Spinner from "@/components/ui/spinner";
import { getQueryUrlParams } from "@/lib/url";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import {
  type KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

const authorExamples = [
  "Ibn Taymiyyah",
  "Ibn Hazm",
  "Ibn Hanbal",
  "Ibn al-Jawzi",
];

const bookExamples = [
  "Riyad al-Salihin",
  "Fath al-Bari",
  "Da Wa Dawa",
  "Usul Sunna",
];

const DEBOUNCE_DELAY = 300;

export default function SearchInput({
  disabled,
  defaultValue,
}: {
  disabled?: boolean;
  defaultValue?: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const [value, setValue] = useState(defaultValue);
  const currentPage = pathname === "/authors" ? "authors" : "books";
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(term: string) {
    setValue(term);
    const params = getQueryUrlParams(term);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newTimeout = setTimeout(() => {
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }, DEBOUNCE_DELAY);

    // @ts-ignore
    timeoutRef.current = newTimeout;
  }

  useEffect(() => {
    // listen for / char and focus input
    const handler: KeyboardEventHandler = (e) => {
      if (e.key === "/") {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keyup", handler as any);

    return () => {
      window.removeEventListener("keyup", handler as any);
    };
  }, []);

  return (
    <div>
      <div className="relative w-full text-black">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />

        <input
          className="w-full rounded-md bg-white px-4 py-3 pl-12 shadow outline-none transition-all duration-200 ease-in-out focus:ring-2 focus:ring-white focus:ring-offset-[3px] focus:ring-offset-primary"
          name="query"
          type="text"
          disabled={disabled}
          placeholder="Enter your query..."
          autoComplete="off"
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          ref={inputRef}
        />

        {isPending && <Spinner className="absolute right-4 top-3.5 h-6 w-6" />}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        Try:
        {(currentPage === "authors" ? authorExamples : bookExamples).map(
          (example) => (
            <button
              key={example}
              className="text-sm font-thin text-blue-200 underline"
              onClick={() => handleSearch(example)}
            >
              {example}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
