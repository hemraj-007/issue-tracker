'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import axios from 'axios';

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router= useRouter();
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

    // Form submit handler
    const onSubmit =async (data:any) => {
        //console.log('Form Submitted:', data);
        const issue=await axios.post('/api/issues',data);
        router.push('/issues');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Create New Issue
            </h2>

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
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit New Issue{' '}
                    {isSubmitting && (
                        <span className="spinner-border spinner-border-sm ml-2"></span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default NewIssuePage;
