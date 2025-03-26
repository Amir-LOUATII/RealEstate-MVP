"use client";

import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PropertiesPagination({
  totalPages,
  currentPage,
  pageSize,
}: {
  totalPages: number;
  currentPage: number;
  pageSize: number;
}) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams ?? {});

  const [maxVisiblePages, setMaxVisiblePages] = useState(3);

  // Using useEffect instead of useLayoutEffect to avoid server/client mismatch warnings
  useEffect(() => {
    const updateMaxVisiblePages = () => {
      if (window.innerWidth < 640) {
        setMaxVisiblePages(1);
      } else if (window.innerWidth < 768) {
        setMaxVisiblePages(3);
      } else {
        setMaxVisiblePages(5);
      }
    };

    updateMaxVisiblePages();
    window.addEventListener("resize", updateMaxVisiblePages);

    return () => {
      window.removeEventListener("resize", updateMaxVisiblePages);
    };
  }, []);

  function handlePageSizeChange(value: string) {
    params.set("pageSize", value);
    params.set("page", "0");
    replace(`${path}?${params.toString()}`);
  }

  function nextURL() {
    if (currentPage < totalPages - 1) {
      params.set("page", `${currentPage + 1}`);
    }
    return `${path}?${params.toString()}`;
  }

  function previousPage() {
    if (currentPage > 0) {
      params.set("page", `${currentPage - 1}`);
    }
    return `${path}?${params.toString()}`;
  }

  function navigate(num: number) {
    if (num >= 0 && num < totalPages) {
      params.set("page", `${num}`);
    }
    return `${path}?${params.toString()}`;
  }

  function generatePageNumbers(currentPage: number, totalPages: number) {
    const pages = [];
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisiblePages);

    if (currentPage <= halfVisiblePages) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    }

    if (currentPage + halfVisiblePages >= totalPages - 1) {
      startPage = Math.max(0, totalPages - maxVisiblePages);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 0) {
      pages.unshift(-1); // Use -1 to represent ellipsis
    }

    if (endPage < totalPages - 1) {
      pages.push(-1); // Use -1 to represent ellipsis
    }

    return pages;
  }

  const pages = generatePageNumbers(currentPage, totalPages);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="w-full space-y-4 my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="pageSizeSelect"
            className="text-sm font-medium mb-1.5 text-muted-foreground"
          >
            Items per page
          </label>
          <Select
            onValueChange={handlePageSizeChange}
            value={pageSize.toString()}
          >
            <SelectTrigger
              id="pageSizeSelect"
              className="w-28 h-9 bg-background border-input hover:bg-accent/50 transition-colors"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 items</SelectItem>
              <SelectItem value="10">10 items</SelectItem>
              <SelectItem value="20">20 items</SelectItem>
              <SelectItem value="50">50 items</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Badge
          variant="outline"
          className="px-3 py-1.5 text-sm font-medium self-end sm:self-center"
        >
          Page {currentPage + 1} of {totalPages}
        </Badge>
      </div>

      <Pagination className="mx-auto">
        <PaginationContent className="flex-wrap gap-1 sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={previousPage()}
              className={`flex items-center gap-1 transition-colors ${
                isFirstPage
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-disabled={isFirstPage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </PaginationPrevious>
          </PaginationItem>

          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === -1 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={navigate(page)}
                  isActive={page === currentPage}
                  className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {page + 1}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={nextURL()}
              className={`flex items-center gap-1 transition-colors ${
                isLastPage
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              aria-disabled={isLastPage}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PropertiesPagination;
