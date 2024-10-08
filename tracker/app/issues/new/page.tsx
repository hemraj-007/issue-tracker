'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import Spinner from '@/app/components/Spinner';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmit, setIsSubmt] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IssueForm>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  // Form submit handler with error handling
  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    setSubmissionError(null);
    try {
      setIsSubmt(true);
      const response = await axios.post('/api/issues', data);

      if (response.status === 201 || response.status === 200) {
        router.push('/issues');
      } else {
        setIsSubmt(false);
        setSubmissionError('Failed to create issue. Please try again.');
      }
    } catch (error: any) {
      setSubmissionError(error?.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Issue</h2>

      {/* Display Error Message on Failed Submission */}
      {submissionError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          <span>{submissionError}</span>
        </div>
      )}

      {/* Form Container */}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Section */}
        <Label.Root htmlFor="issue-title" className="block text-lg font-semibold text-gray-700 mb-2">
          Title
        </Label.Root>
        <div>
          <input
            id="issue-title"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 255,
                message: "Title can't exceed 255 characters",
              },
            })}
          />
          {/* Display Error Message for Title */}
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Description Section using Controller */}
        <Label.Root htmlFor="description-editor" className="block text-lg font-semibold text-gray-700 mb-2">
          Description
        </Label.Root>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <SimpleMDE
              id="description-editor"
              placeholder="Enter issue description..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {/* Display Error Message for Description */}
        {errors.description && (
          <span className="text-red-500 text-sm">{errors.description.message}</span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit New Issue{' '}
          {isSubmit && <Spinner />}
        </button>
      </form>
    </div>
  );
};

export default NewIssuePage;
