import React from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssuesStatusBadge';

const IssuesPage = async () => {
  // Fetch issues data directly using Prisma
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-6">
      {/* Button to create a new issue */}
      <div className='p-3'>
        <Link href="/issues/new">
          <Button >New Issue</Button>
        </Link>
      </div>

      {/* Table to display the issues */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {
            issues.map((issue) => (
              <tr key={issue.id}>
                <td className="border border-gray-300 px-4 py-2">
                  <Link href={`/issues/${issue.id}`} className="relative group inline-block text-lg font-medium transition-transform duration-300 ease-in-out hover:scale-105">
                    <span className="relative z-10">
                      {issue.title}
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <IssueStatusBadge status={issue.status} />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default IssuesPage;
