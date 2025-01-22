'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AddButton from './buttons/addButton';
import EditButton from './buttons/editButton';
import DeactivateButton from './buttons/deactivateButton';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CircleAlert, CircleUser } from 'lucide-react';


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  is_active: boolean | null;
  created_at: Date | null;
}



type SortDirection = 'asc' | 'desc' | null;

interface FilteredTableProps {
  UserData: User[];
}


export default function FilteredTable({ UserData }: FilteredTableProps) {
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // Filter function
  const filteredData = UserData.filter((item) =>
    Object.values(item).some((value) =>
      value !== null && value !== undefined && value.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  // Sort function
  const sortedData = [...filteredData].sort((a, b) => {
    if (a.is_active && !b.is_active) return -1;
    if (!a.is_active && b.is_active) return 1;

    if (sortColumn) {
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      // Ensure both values are strings before comparing
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else if (sortDirection === 'desc') {
          return bValue.localeCompare(aValue);
        }
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        if (sortDirection === 'asc') {
          return aValue.getTime() - bValue.getTime();
        } else if (sortDirection === 'desc') {
          return bValue.getTime() - aValue.getTime();
        }
      }
    }

    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search a user..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <AddButton />
        <Select
          value={rowsPerPage.toString()}
          onValueChange={(value) => {
            setRowsPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 rows</SelectItem>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='rounded-lg overflow-clip border to-black'>
        <Table className='table-fixed'>
          <TableHeader className='bg-purple-800 ' >
            <TableRow >
              <TableHead className="cursor-pointer text-white w-9">

              </TableHead>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer text-white" >
                Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead onClick={() => handleSort('email')} className="cursor-pointer text-white w-4/12" >
                Email {sortColumn === 'email' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead onClick={() => handleSort('role')} className="cursor-pointer text-white w-2/12">
                Role {sortColumn === 'role' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead className="cursor-pointer text-white w-2/12 ">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((UserData) => (
              <TableRow key={UserData.id}>
                <TableCell>{UserData.is_active ? <CircleUser color='green' /> : <CircleAlert color='red' />}</TableCell>
                <TableCell>{UserData.name}</TableCell>
                <TableCell>{UserData.email}</TableCell>
                <TableCell>{UserData.role}</TableCell>
                <TableCell>
                  <div className="flex">
                    <EditButton initialData={UserData} userId={UserData.id} />
                    <DeactivateButton userId={UserData.id} is_active={UserData.is_active} />
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div>
          Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

