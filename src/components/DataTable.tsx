"use client"
import React, { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export interface Column<T> {
  key: string
  header: string
  render?: (row: T, index: number) => React.ReactNode
  className?: string
}
interface ExpandableConfig<T> {
  renderContent: (row: T) => React.ReactNode
  expandIconColumnIndex?: number
}
interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  expandableConfig?: ExpandableConfig<T>
  className?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyActionLabel?: string
  onEmptyAction?: () => void
  emptyIcon?: React.ReactNode
  isSearchEmpty?: boolean
}
export function DataTable<T>({ 
  columns, 
  data, 
  expandableConfig,
  className = "",
}: DataTableProps<T>) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index)
  }
  const isExpandable = !!expandableConfig
  const expandIconIndex = expandableConfig?.expandIconColumnIndex ?? 0
  if (data.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="rounded border border-gray-200/60 dark:border-gray-700/60 overflow-hidden bg-white dark:bg-gray-900">
          <div>
            No data found
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded border border-gray-200/60 dark:border-gray-700/60 overflow-hidden bg-white dark:bg-gray-900">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
            <TableRow className="hover:bg-transparent border-b border-gray-200/60 dark:border-gray-700/60">
              {isExpandable && (
                <TableHead className="w-5 px-1 py-1">
                  <span className="sr-only">Expand</span>
                </TableHead>
              )}
              
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`font-semibold text-gray-700 dark:text-gray-200 text-[10px] uppercase tracking-wide px-2 py-1 ${col.className ?? ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => {
              const isExpanded = expandedRow === rowIndex
              
              return (
                <React.Fragment key={rowIndex}>
                  <TableRow className={`
                    hover:bg-gray-50/80 dark:hover:bg-gray-800/40 
                    border-b border-gray-100/60 dark:border-gray-700/40
                    transition-colors
                    ${isExpanded ? 'bg-gray-50/60 dark:bg-gray-800/30' : ''}
                  `}>
                    {isExpandable && (
                      <TableCell className="px-1 py-1 w-5">
                        <button
                          onClick={() => toggleRow(rowIndex)}
                          className="p-0.5 rounded hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-colors"
                          aria-label={isExpanded ? "Collapse row" : "Expand row"}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-500 dark:text-gray-500" />
                          )}
                        </button>
                      </TableCell>
                    )}
                    {columns.map((col, colIndex) => (
                      <TableCell 
                        key={col.key} 
                        className={`
                          px-2 py-1 text-[11px] text-gray-800 dark:text-gray-200
                          ${col.className || ''}
                          ${isExpandable && colIndex === expandIconIndex ? 'cursor-pointer select-none' : ''}
                        `}
                        onClick={() => {
                          if (isExpandable && colIndex === expandIconIndex) {
                            toggleRow(rowIndex)
                          }
                        }}
                      >
                        <div className="truncate">
                          {col.render ? col.render(row, rowIndex) : (row as any)[col.key]}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  {isExpandable && isExpanded && (
                    <TableRow className="bg-gray-50/80 dark:bg-gray-800/30">
                      <TableCell 
                        colSpan={columns.length + 1} 
                        className="px-3 py-2 border-b border-gray-100/60 dark:border-gray-700/40"
                      >
                        <div className="text-[11px] text-gray-700 dark:text-gray-300">
                          {expandableConfig.renderContent(row)}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}