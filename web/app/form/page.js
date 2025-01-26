'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import QRCode from 'qrcode';


const ClientInfoForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        RAMQ: '',
        urgency: '',
        resource: '',
        description: '',
    });

    const [qrCode, setQrCode] = useState('');

    const temp = "rec_cuam485qrj62jjc8c70g";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Generate QR code
            // const qrData = JSON.stringify(formData);
            const qrData = temp
            const qrCodeUrl = await QRCode.toDataURL(qrData);
            setQrCode(qrCodeUrl);
            console.log('Form submitted:', formData);
        } catch (err) {
            console.error('Error generating QR Code:', err);
        }
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
                                placeholder="Enter first name"
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
                                placeholder="Enter last name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="RAMQ">RAMQ </label>
                            <Input
                                id="RAMQ"
                                name="RAMQ"
                                type="text"
                                placeholder="Enter RAMQ number"
                                value={formData.RAMQ}
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
                        <Button type="submit" className="w-full" >Submit</Button>
                    </form>
                </CardContent>
            </Card>
            {qrCode && (
                <div className="text-center">
                    <h2 className="text-lg font-bold mb-2">Generated QR Code</h2>
                    <img src={qrCode} alt="QR Code" className="inline-block border p-2 rounded-lg" />
                </div>
            )}  
        </div>
    );
};

export default ClientInfoForm;
