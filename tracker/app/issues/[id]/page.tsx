import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { Badge, Card, Heading, Text } from '@radix-ui/themes';
import { Status } from '@prisma/client';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: { id: string };
}

const IssueDetails = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) {
        notFound();
    }

    // Map enum values to user-friendly labels and colors
    const statusMap = {
        [Status.OPEN]: { label: 'Open', color: 'bg-green-100 text-green-800' },
        [Status.IN_PROGRESS]: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
        [Status.CLOSED]: { label: 'Closed', color: 'bg-red-100 text-red-800' },
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg">
                {/* Title */}
                <Heading className="text-2xl font-bold mb-4 text-gray-800">
                    {issue.title}
                </Heading>

                {/* Description */}
                <Text className="text-lg text-gray-600 mb-6"><ReactMarkdown>{issue.description}</ReactMarkdown></Text>

                {/* Status */}
                <div className="mb-4">
                    <span className="font-semibold text-gray-700">Status: </span>
                    <Badge
                        size="2"
                        variant="solid"
                        className={`${statusMap[issue.status].color} px-3 py-1 rounded-full`}
                    >
                        {statusMap[issue.status].label}
                    </Badge>
                </div>

                {/* Created At */}
                <div className="mb-4">
                    <span className="font-semibold text-gray-700">Created At: </span>
                    <span className="text-gray-500">
                        {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default IssueDetails;
