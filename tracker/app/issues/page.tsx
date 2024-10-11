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
      <Link href="/issues/new">
        <Button className="mb-4">New Issue</Button>
      </Link>

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
                <td className="border border-gray-300 px-4 py-2"><Link href={`/issues/${issue.id}`}>{issue.title}</Link></td>
                <td className="border border-gray-300 px-4 py-2"><IssueStatusBadge status={issue.status} /></td>
                <td className="border border-gray-300 px-4 py-2">{new Date(issue.createdAt).toLocaleDateString()}</td>
              </tr>

            ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesPage;
