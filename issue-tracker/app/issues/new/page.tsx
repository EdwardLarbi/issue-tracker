'use client';
//import React from 'react'
import { TextField, Button, Callout } from '@radix-ui/themes';
import { useForm, Controller } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssue = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();
    const [error, setError] = useState('');

  return (
    <div>
        {error && <Callout.Root color='red' className='max-w-xl mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
            try {
                await axios.post('/api/issues', data); 
                router.push('/issues'); 
            } catch (error) {
                setError('an unexpected error occurred')
            }
        })}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            <Controller
                name='description'
                control={control}
                render={( {field} ) => <SimpleMDE placeholder='Description' {...field} />}
            />
            <Button>Submit New Issue</Button>
        </form>
    </div>
  )
}

export default NewIssue