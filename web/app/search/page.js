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
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const ClientInfoForm = () => {
    const [formData, setFormData] = useState({
        postal_code: '',
        last_name: '',
        RAMQ: '',
        urgency: '',
        description: '',
        resource: '',   
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleResourceChange = (value) => {
        setFormData({
            ...formData,
            resource: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // You can add API calls here to send the data to the server
    };
    

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-lg p-4 shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
                <CardContent>
                    <h1 className="text-xl font-bold mb-4">Hospital Search</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="postal_code">Postal Code</label>
                            <Input
                                id="postal_code"
                                name="postal_code"
                                type="text"
                                placeholder="Enter postal code"
                                value={formData.postal_code}
                                onChange={handleChange}
                            />
                        </div>
                    

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="urgency"> Urgency </label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <button
                                                    key={level}
                                                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${formData.urgency === level.toString() ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
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
                            <label className="block text-sm font-medium mb-1" htmlFor="resource">Resource</label>
                            <Select onValueChange={handleResourceChange}>
                                <SelectTrigger>
                                    <Input
                                        id="resource"
                                        name="resource"
                                        placeholder="Select a resource"
                                        value={formData.resource}
                                        readOnly
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="X-Ray">X-Ray</SelectItem>
                                    <SelectItem value="MRI">MRI</SelectItem>
                                    <SelectItem value="CatScan">CatScan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="message">Description</label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter your description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: '#107DA5', color: '#FFFFFF' }}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ClientInfoForm;
