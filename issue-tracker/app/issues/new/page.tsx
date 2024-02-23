'use client';
//import React from 'react'
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import Spinner from '@/app/components/Spinner';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssue = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div>
        {error && <Callout.Root color='red' className='max-w-xl mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
            try {
                setSubmitting(true);
                await axios.post('/api/issues', data); 
                router.push('/issues'); 
            } catch (error) {
                setSubmitting(false);
                setError('an unexpected error occurred')
            }
        })}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
            <Controller
                name='description'
                control={control}
                render={( {field} ) => <SimpleMDE placeholder='Description' {...field} />}
            />
            {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner></Spinner>}</Button>
        </form>
    </div>
  )
}

export default NewIssue