import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

import { calculatePageBounds } from '@/utility/calculatePageBounds'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useMemo } from 'react'

export interface PaginationProps {
  activePage: number
  itemsCountPerPage: number
  totalItemsCount: number
  pageRangeDisplayed: number
  onChange: (page: number) => void
  hideDisabled?: boolean
}

export const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage)
  const isFirstPage = activePage === 1
  const isLastPage = activePage === totalPages

  const { startPage, endPage } = useMemo(
    () => calculatePageBounds(activePage, totalPages, pageRangeDisplayed),
    [activePage, totalPages, pageRangeDisplayed]
  )

  const pageNumbers = useMemo(
    () => Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i),
    [startPage, endPage]
  )

  const handleClick = (page: number) => {
    if (page !== activePage) {
      onChange(page)
    }
  }

  return (
    <PaginationShadcn>
      <PaginationContent>
        {!isFirstPage && !pageNumbers.includes(1) && (
          <PaginationItem>
            <PaginationLink onClick={() => handleClick(1)} href={""}>
              <ChevronLeftIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}

        {pageNumbers.map((page) => {
          const isCurrPage = page === activePage

          return (
            <PaginationItem>
              <PaginationLink onClick={() => handleClick(page)} href="#" isActive={isCurrPage}>{page}</PaginationLink>
            </PaginationItem>
          )
        })}

        {pageNumbers.length < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {!isLastPage && !pageNumbers.includes(totalPages) && (
          <PaginationItem>
            <PaginationLink onClick={() => handleClick(totalPages)} href="#">
              <ChevronRightIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationShadcn>
  )
}
