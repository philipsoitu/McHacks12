'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const ClientInfoForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        urgency: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // You can add API calls here to send the data to the server
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-lg p-4 shadow-lg">
                <CardContent>
                    <h1 className="text-xl font-bold mb-4">Client Information Form</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="first_name">First Name</label>
                            <Input
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="Enter your first name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="last_name">Last Name</label>
                            <Input
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Enter your last name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="urgency"> Urgency </label>

                            <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            className={`px-4 py-2 text-sm font-medium transition-colors ${formData.urgency === level.toString() ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
            onClick={() => handleChange({ target: { name: "urgency", value: level.toString() } })}
          >
            {level}
          </button>
        ))}
      </div>
    </TooltipTrigger>
    <TooltipContent>
      <p>Level I: Severely ill and requires resuscitation</p>
      <p>Level II: Requires emergent care and rapid medical intervention</p>
      <p>Level III: Requires urgent care</p>
      <p>Level IV: Requires less-urgent care</p>
      <p>Level V: Requires non-urgent care</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientInfoForm;
