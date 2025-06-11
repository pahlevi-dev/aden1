'use client';

import { IColumn } from '@/interface/config/column';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useCallback, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

interface IPaginatedTableProps<T> {
  columns: IColumn[];
  pageSize: number;
  totalSize: number;
  page: number;
  data: T[];
  caption?: string;
  scrollToTop?: boolean;
  renderCell?: (row: T, colKey: keyof T | string) => ReactNode;
}

const PaginatedTable = <T,>({
  data = [],
  columns,
  page,
  pageSize,
  totalSize,
  renderCell,
  caption,
  scrollToTop = true,
}: IPaginatedTableProps<T>) => {
  const totalPages = Math.ceil(totalSize / pageSize) ?? 0;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const persistentScroll = localStorage.getItem('persistentScroll');

    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(persistentScroll) });

    if (Number(persistentScroll) === window.scrollY) {
      localStorage.removeItem('persistentScroll');
    }
  }, [searchParams]);

  useEffect(() => {
    const page = Number(searchParams.get('page'));

    if (page > totalPages || page === 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('page');

      if (scrollToTop) {
        localStorage.setItem('persistentScroll', '0');
      } else {
        localStorage.setItem('persistentScroll', window.scrollY.toString());
      }

      replace(
        `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`,
        {
          scroll: true,
        }
      );
    }
  }, [pathname, searchParams, replace, totalPages, scrollToTop]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage === 0 || newPage > totalPages) {
        return;
      }

      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());

      if (scrollToTop) {
        localStorage.setItem('persistentScroll', '0');
      } else {
        localStorage.setItem('persistentScroll', window.scrollY.toString());
      }

      replace(`${pathname}?${params.toString()}`, {
        scroll: true,
      });
    },
    [replace, pathname, searchParams, scrollToTop, totalPages]
  );

  return (
    <div className="space-y-4 p-3 bg-white">
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((item) => (
              <TableHead
                key={item.key}
                className={`font-semibold ${
                  item.width ? `w-[${item.width}]` : 'w-auto'
                }`}
              >
                {item.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {renderCell
                      ? renderCell(row, col.key)
                      : row[col.key as keyof unknown] ?? '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 0 && (
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="rounded-md p-3"
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => {
              const currentPage = index + 1;

              if (totalPages > 5) {
                if (currentPage === 1) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className={`rounded-md ${
                          page === currentPage
                            ? 'bg-[#00CCFF] shadow-md hover:bg-[#00CCFF]'
                            : ''
                        }`}
                        onClick={() => handlePageChange(currentPage)}
                        isActive={page === currentPage}
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (currentPage === totalPages) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className={`rounded-md ${
                          page === currentPage
                            ? 'bg-[#00CCFF] shadow-md hover:bg-[#00CCFF]'
                            : ''
                        }`}
                        onClick={() => handlePageChange(currentPage)}
                        isActive={page === currentPage}
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (
                  currentPage === 2 ||
                  currentPage === totalPages - 1 ||
                  (currentPage >= page - 1 && currentPage <= page + 1)
                ) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className={`rounded-md ${
                          page === currentPage
                            ? 'bg-[#00CCFF] shadow-md hover:bg-[#00CCFF]'
                            : ''
                        }`}
                        onClick={() => handlePageChange(currentPage)}
                        isActive={page === currentPage}
                      >
                        {currentPage}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                if (
                  (currentPage === 3 && page > 4) ||
                  (currentPage === totalPages - 2 && page < totalPages - 3)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    className={`rounded-md ${
                      page === currentPage
                        ? 'bg-[#00CCFF] shadow-md hover:bg-[#00CCFF]'
                        : ''
                    }`}
                    onClick={() => handlePageChange(currentPage)}
                    isActive={page === currentPage}
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                className="rounded-md p-3"
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PaginatedTable;
