import type { searchAuthors } from "@/lib/search";
import { cn } from "@/lib/utils";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import SearchResultItem from "./search-result-item";

const AuthorItem = ({
  result,
}: {
  result: NonNullable<
    Awaited<ReturnType<typeof searchAuthors>>["results"]["hits"]
  >[number];
}) => {
  const { document, highlight } = result;

  const primaryArabicName = highlight.primaryArabicName?.snippet
    ? highlight.primaryArabicName.snippet
    : document.primaryArabicName;
  const primaryLatinName = highlight.primaryLatinName?.snippet
    ? highlight.primaryLatinName.snippet
    : document.primaryLatinName;

  if (!primaryArabicName && !primaryLatinName) {
    return null;
  }

  const githubUrl = `https://github.com/OpenITI/RELEASE/tree/2385733573ab800b5aea09bc846b1d864f475476/data/${document.id}`;

  return (
    <SearchResultItem
      collapsedContent={
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex w-fit flex-col items-start">
              {primaryArabicName && (
                <h2
                  dir="rtl"
                  className="line-clamp-1 text-ellipsis text-xl text-slate-900"
                  dangerouslySetInnerHTML={{
                    __html: primaryArabicName,
                  }}
                />
              )}

              {primaryLatinName && (
                <h2
                  className={cn(
                    "line-clamp-1 text-ellipsis",
                    primaryArabicName
                      ? "mt-2 text-lg text-slate-600"
                      : "text-xl text-slate-900",
                  )}
                  dangerouslySetInnerHTML={{
                    __html: primaryLatinName,
                  }}
                />
              )}
            </div>
          </div>

          <div
            className="hidden flex-1 flex-col items-center gap-1 sm:flex"
            dir="rtl"
          >
            {document.books.slice(0, 2).map((book) => (
              <div key={book.id} className="flex gap-1">
                <span>-</span>{" "}
                <p className="line-clamp-1 overflow-ellipsis">
                  {book.primaryArabicName ?? book.primaryLatinName}
                </p>
              </div>
            ))}
            {document.books.length > 2 && (
              <p className="text-slate-700">
                +{document.books.length - 2} more
              </p>
            )}
          </div>

          <div className="flex-[0.5] text-center">{document.year} AH</div>
        </div>
      }
      expandedContent={
        <>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row-reverse sm:gap-0">
            <div className="max-w-lg flex-1 text-right">
              {primaryArabicName && (
                <h2
                  className="text-xl text-slate-900"
                  dangerouslySetInnerHTML={{
                    __html: primaryArabicName,
                  }}
                />
              )}
              <p className="text-slate-700">
                {document.otherArabicNames.join(", ")}
              </p>
            </div>

            <div className="max-w-lg flex-1 text-left">
              {primaryLatinName && (
                <h2
                  className="text-xl text-slate-900"
                  dangerouslySetInnerHTML={{
                    __html: primaryLatinName,
                  }}
                />
              )}

              <p className="text-slate-700">
                {document.otherLatinNames.join(", ")}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <p className="text-xl font-bold">Year:</p>
            <p>{document.year} AH</p>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <p className="text-xl font-bold">Github URL:</p>

            <a
              href={githubUrl}
              target="blank"
              className="text-primary flex items-center gap-2 underline"
            >
              Open link <ArrowUpRightIcon className="h-3 w-3" />
            </a>
          </div>

          <div className="mt-3">
            <p className="text-xl font-bold">Books:</p>
            <div className="mt-3 grid grid-cols-1 items-end gap-y-5 sm:grid-cols-2 sm:gap-x-20">
              {document.books.map((book) => {
                const slug = `${document.id}/${book.id}`;
                const githubUrl = `https://github.com/OpenITI/RELEASE/tree/2385733573ab800b5aea09bc846b1d864f475476/data/${slug}`;

                return (
                  <div key={book.id} className="flex h-full items-center">
                    <a
                      className="text-primary hover:text-primary/80 block w-fit hover:underline"
                      href={githubUrl}
                      target="_blank"
                    >
                      <p>{book.primaryArabicName}</p>
                      <p>{book.primaryLatinName}</p>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      }
    />
  );
};

export default AuthorItem;
