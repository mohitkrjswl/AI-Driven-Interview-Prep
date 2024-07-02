"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobdesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(jobDesc, jobExperience, jobPosition)
    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description, Years of Experience give us 10 interview questions along with answers in json format. Give us question and answer in json.`;
    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(JSON.parse(mockJsonResp));
    setJsonResponse(mockJsonResp);

    if (mockJsonResp) {
      const resp = db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: mockJsonResp,
        jobPosition: jobPosition,
        jobDesc: jobDesc,

        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      }).returning({ mockId: MockInterview.mockId })
      console.log('Inserted ID:', resp)
    }
    else {
      console.log("ERROR");
    }
    setLoading(false)
  }
  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-slate-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className='text-large text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='bg-white rounded-lg p-5 max-w-2xl'>
          <DialogHeader >
            <DialogTitle className='text-xl'>Tell us about your Job role</DialogTitle>
            <DialogDescription >
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details about your Job position/Role, job description and years of experience.</h2>
                  <div className='mt-7 my-3'>
                    <label>Job Role/Position</label>
                    <Input placeholder='Ex. Front End Developer' required onChange={(event) => setJobPosition(event.target.value)} />
                  </div>
                  <div className='my-3'>
                    <label>Job Description</label>
                    <Textarea placeholder='Ex. React js,Node js,Django,SQL etc.' max='300' required onChange={(event) => setJobdesc(event.target.value)} />
                  </div>
                  <div className='my-3'>
                    <label>Years of experience</label>
                    <Input placeholder='Ex.1' type='number' max='50' required onChange={(event) => setJobExperience(event.target.value)} />
                  </div>
                </div>

                <div className='flex gap-5 justify-end mt-5'>
                  <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)} className='rounded-md'>
                    Cancel
                  </Button>
                  <Button type='submit' disabled={loading} className='rounded-md'>
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin' />Generating from AI
                      </> : 'Start Interview'
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
