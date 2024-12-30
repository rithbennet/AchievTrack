'use client';
import AddButton from '../buttons/addButton';
import DeleteButton from '../buttons/deleteButton';
import ViewButton from '../buttons/viewButton';
import EditButton from '../buttons/editButton';
import PdfButton from '../buttons/pdfButton';
import ImportButton from '../buttons/importButton';
import Verify from '../buttons/verify';
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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface Student {
  id: number;
  name: string;
  class: string;
}

export interface TeacherUser {
  id: number;
  name: string;
  email: string;
}

export interface Teacher {
  id: number;
  User: TeacherUser;
}

export interface AchievementData {
  id: number;
  title: string;
  date: Date;
  category: string;
  level: string;
  certificate: string[];
  description: string | null;
  createdby: number | null;
  verified: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
  achievementstudents: { Student: Student }[];
  achievementteachers: { Teacher: Teacher }[];
}

type SortDirection = 'asc' | 'desc' | null;

interface FilteredTableProps {
  achievementData: AchievementData[];
}

export default function FilteredTable({ achievementData }: FilteredTableProps) {
  const [filterValue, setFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // Filter function
  const filteredData = achievementData.filter((item) =>
    Object.values(item).some((value) =>
      value !== null && value !== undefined && value.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  // Sort function
  const sortedData = [...filteredData].sort((a, b) => {
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
          placeholder="Seach an achievement..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <ImportButton />
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
        <Table className=''>
          <TableHeader className='bg-purple-800 ' >
            <TableRow >

              <TableHead onClick={() => handleSort('title')} className="cursor-pointer text-white" >
                Title {sortColumn === 'title' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead onClick={() => handleSort('category')} className="cursor-pointer text-white" >
                Catergory {sortColumn === 'categort' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead onClick={() => handleSort('level')} className="cursor-pointer text-white">
                Level {sortColumn === 'level' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead onClick={() => handleSort('date')} className="cursor-pointer text-white">
                Date {sortColumn === 'date' && (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}
              </TableHead>
              <TableHead className="cursor-pointer text-white">
                Actions
              </TableHead>
              <TableHead className="cursor-pointer text-white">
                Verified
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((achievementData) => (
              <TableRow key={achievementData.id}>

                <TableCell>{achievementData.title}</TableCell>
                <TableCell>{achievementData.category}</TableCell>
                <TableCell>{achievementData.level}</TableCell>
                <TableCell>{achievementData.date.toLocaleDateString('en-GB')}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditButton achievement={achievementData} students={achievementData.achievementstudents} teachers={achievementData.achievementteachers} />
                    <DeleteButton achievementId={achievementData.id} />
                    <ViewButton achievement={achievementData} students={achievementData.achievementstudents} teachers={achievementData.achievementteachers} />
                  </div>
                </TableCell>
                <TableCell className='w-1/12'>
                  <Verify id={achievementData.id} initialVerified={achievementData.verified} />
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
        <PdfButton achievements={sortedData}
          logoPath="/logo.png" // Replace with the actual path to your logo
        />
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

