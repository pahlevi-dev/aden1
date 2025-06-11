'use client';

import { IGallery } from '@/interface/query/gallery';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
import { CardGallery } from './CardGallery';

interface IProps {
  data: IGallery['galleries'];
  pageSize: number;
  totalSize: number;
  page: number;
}

export const ContainerGallery = ({
  data,
  page,
  pageSize,
  totalSize,
}: IProps) => {
  const totalPages = Math.ceil(totalSize / pageSize) ?? 0;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Empty');

  useEffect(() => {
    const page = Number(searchParams.get('page'));

    if (page > totalPages || page === 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('page');

      replace(
        `${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`
      );
    }
  }, [pathname, searchParams, replace, totalPages]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage === 0 || newPage > totalPages) {
        return;
      }

      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());

      replace(`${pathname}?${params.toString()}`);
    },
    [replace, pathname, searchParams, totalPages]
  );

  if (data?.length === 0 || !data)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl">{t('title')}</p>
          <p>{t('description')}</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {data?.map((item, i) => (
          <CardGallery
            key={i}
            index={i}
            image={item.image}
            title={item.title}
            shortDescription={item.shortDescription}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="justify-center">
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
