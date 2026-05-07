"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDeleteContactInfoMutation, useGetContactInfoQuery } from "@/redux/apis/admin.api";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { DELETE_CONTACT_INFO_REQUEST } from "@/types/admin";
import { format } from "date-fns";

const ContactPage = () => {
    const { data } = useGetContactInfoQuery();
    const [deleteContact] = useDeleteContactInfoMutation();

    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const handleView = (contact: any) => {
        setSelectedContact(contact);
        setOpen(true);
    };

    const handleDelete = async (data: DELETE_CONTACT_INFO_REQUEST) => {
        try {
            await deleteContact(data).unwrap();
            toast.success("Inquiry Deleted Successfully");
        } catch (error) {
            toast.error("Failed to delete inquiry");
        }
    };

    return <>
        <div className="p-4 md:p-6 min-h-screen !bg-gray-50 !text-gray-800">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl md:text-3xl font-semibold !text-gray-700">Contact Inquiries</h1>
                <div className="text-sm !text-gray-500 !bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    Total: {data?.result?.length || 0}
                </div>
            </div>

            <div className="text-center">
                {data && data.result.length === 0 && (
                    <h1 className="text-center text-2xl font-bold text-gray-400 mt-10">
                        No Contact Information Available
                    </h1>
                )}
            </div>

            {/* RESPONSIVE TABLE CONTAINER */}
            {data && data.result.length > 0 && (
                <div className="w-full !bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {/* min-w ensures table doesn't collapse on small screens */}
                        <table className="min-w-[800px] w-full text-sm !text-gray-600">

                            {/* Table Head */}
                            <thead className="bg-[#145EFB] text-white!">
                                <tr>
                                    <th className="px-3 py-4 text-center font-semibold uppercase tracking-wider">Sr.No</th>
                                    <th className="px-3 py-4 text-center font-semibold uppercase tracking-wider">Name</th>
                                    <th className="px-3 py-4 text-center font-semibold uppercase tracking-wider">Email</th>
                                    <th className="px-3 py-4 text-center font-semibold uppercase tracking-wider">Phone</th>
                                    <th className="px-3 py-4 text-center font-semibold uppercase tracking-wider">Date</th>
                                    <th className="px-3 py-4 text-center font-semibold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="!bg-white">
                                {data?.result?.map((item: any, index: number) => (
                                    <tr key={item._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-4 text-center !text-gray-500">{index + 1}</td>
                                        <td className="px-3 py-4 text-center font-medium !text-gray-900">{item.name}</td>
                                        <td className="px-3 py-4 text-center !text-gray-500">{item.email}</td>
                                        <td className="px-3 py-4 text-center !text-gray-500">{item.phone || "N/A"}</td>
                                        <td className="px-3 py-4 text-center text-gray-500!">
                                            {item.createdAt ? format(new Date(item.createdAt), "dd MMMM yyyy") : "N/A"}
                                        </td>

                                        <td className="px-3 py-4">
                                            <div className="flex justify-center items-center gap-2">
                                                <Button
                                                    onClick={() => handleView(item)}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:!bg-blue-50 cursor-pointer h-8 w-8"
                                                >
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </Button>

                                                <Button
                                                    onClick={() => handleDelete({ _id: item._id as string })}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:!bg-red-50 cursor-pointer h-8 w-8"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {/* WHITE MODAL (Forced Light Theme) */}
            <Dialog open={open} onOpenChange={setOpen}>
                {/* 1. Added hiding utilities to DialogContent to prevent the outer container from scrolling */}
                <DialogContent className="sm:max-w-[500px] !bg-white !text-slate-900 rounded-3xl p-0 overflow-hidden border-none shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* FIXED HEADER */}
                    <div className="px-6 pt-6 pb-2 border-b border-gray-50 bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#1e293b]">
                                Message Details
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    {/* 2. SCROLLABLE BODY (The actual hidden scroll area) */}
                    <div className="px-6 py-4 space-y-4 overflow-y-auto max-h-[60vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[#145EFB] font-bold uppercase text-[10px] tracking-widest mb-0.5">From</p>
                                <p className="text-base font-bold text-slate-900">{selectedContact?.name}</p>
                            </div>
                            <div>
                                <p className="text-[#145EFB] font-bold uppercase text-[10px] tracking-widest mb-0.5">Received On</p>
                                <p className="text-base text-slate-600">
                                    {selectedContact?.createdAt ? format(new Date(selectedContact.createdAt), "dd MMM yyyy") : "N/A"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#145EFB] font-bold uppercase text-[10px] tracking-widest mb-1.5">Subject</p>
                            <div className="p-3 !bg-[#f8fafc] rounded-xl border border-slate-100">
                                <p className="text-sm text-slate-800 font-medium">{selectedContact?.subject}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[#145EFB] font-bold uppercase text-[10px] tracking-widest mb-1.5">Message Body</p>
                            <div className="p-4 !bg-[#f0f7ff] rounded-xl border border-[#e0f0ff]">
                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedContact?.message}</p>
                            </div>
                        </div>
                    </div>

                    {/* FIXED FOOTER */}
                    <div className="px-6 pb-6 pt-2 bg-white border-t border-gray-50 flex justify-end">
                        <Button
                            onClick={() => setOpen(false)}
                            className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition-all active:scale-95"
                        >
                            Done
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    </>
};

export default ContactPage;