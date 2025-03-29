"use client";

import { useState, useRef } from "react";
import InvoiceTable from "./InvoiceTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Invoice, Client } from "@prisma/client";

import { cleanDate, numToMonthMap } from "@/utils/date-time.utils";
import routes from "@/utils/routes.utils";

interface IInvoiceCoreProps {
    invoice: Invoice & { client: Client };
}

const InvoiceCore = ({ invoice }: IInvoiceCoreProps) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const invoiceRef = useRef<HTMLDivElement | null>(null);

    const router = useRouter();

    const invoiceNum = `INV-${invoice.id}`;

    const downloadInvoice = async () => {
        if (!invoiceRef.current) {
            return;
        }

        setIsDownloading(true);

        const canvas = await html2canvas(invoiceRef.current, { scale: 3 });
        const imgData = canvas.toDataURL("image/jpeg", 1);

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save(
            `invoice-${invoice.client.name}-${
                numToMonthMap[
                    invoice.issueDate.getMonth() as keyof typeof numToMonthMap
                ]
            }-${invoice.issueDate.getFullYear()}.pdf`
        );

        setIsDownloading(false);
        router.push(routes.homePath());
    };

    return (
        <div className="w-[calc(100vw-12px)] overflow-hidden">
            <div className="flex flex-col items-center space-y-3 absolute left-0 top-0 py-3 z-10 h-screen w-screen overflow-hidden bg-white">
                <p className="text-center text-sm">
                    Invoice for{" "}
                    <span className="font-semibold">
                        {
                            numToMonthMap[
                                invoice.issueDate.getMonth() as keyof typeof numToMonthMap
                            ]
                        }
                        , {invoice.issueDate.getFullYear()}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">{invoice.client.name}</span>{" "}
                    has been successfully created. You may now download it.
                </p>

                <Button
                    icon={<ArrowDownOutlined />}
                    className="w-fit"
                    type="primary"
                    loading={isDownloading}
                    onClick={downloadInvoice}
                >
                    Download Invoice
                </Button>
            </div>

            <section className="space-y-5 p-5 w-[800px]" ref={invoiceRef}>
                <div className="space-y-5 mb-[300px]">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="font-semibold text-[32px]">
                                Tax Invoice
                            </span>
                            <span>{invoice.client.name}</span>
                            <span>{invoice.client.address}</span>
                        </div>

                        <div className="space-y-5">
                            <div className="flex space-x-5">
                                <div className="flex flex-col">
                                    <span>
                                        Invoice Date:{" "}
                                        {cleanDate(invoice.issueDate)}
                                    </span>
                                    <span>Invoice Number: {invoiceNum}</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="font-semibold">
                                        Roji Cleaning Services
                                    </span>
                                    <span>Attention: Sachin Neupane</span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span>Reference</span>
                                <span className="font-semibold">
                                    Cleaning Services Provided for{" "}
                                    {
                                        numToMonthMap[
                                            invoice.issueDate.getUTCMonth() as keyof typeof numToMonthMap
                                        ]
                                    }
                                    , {invoice.issueDate.getFullYear()}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span>ABN</span>
                                <span>67 663 266 153</span>
                            </div>
                        </div>
                    </div>

                    <InvoiceTable
                        issueDate={invoice.issueDate}
                        defaultAmount={invoice.client.defaultAmount}
                    />

                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span>Due Date</span>
                            <span className="font-semibold">
                                {cleanDate(invoice.dueDate)}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-semibold">
                                Bank Account Details
                            </span>

                            <div className="flex flex-col">
                                <span>
                                    Account Name: Roji Cleaning Services
                                </span>
                                <span>BSB Number: 066-132</span>
                                <span>Account Number: 11254176</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-5" style={{ borderTop: "1px dashed black" }}>
                    <div className="flex justify-between">
                        <div>
                            <span className="text-[32px] font-semibold">
                                Payment Advice
                            </span>

                            <div className="flex flex-col">
                                <span>To: Roji Cleaning Services</span>
                                <span>Attention: Sachin Neupane</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-col">
                                <span>Customer: {invoice.client.name}</span>
                                <span>Invoice Number: {invoiceNum}</span>
                                <span>
                                    Amount Due: $
                                    {invoice.amount + invoice.amount * 0.1}
                                </span>
                                <span>
                                    Due Date: {cleanDate(invoice.dueDate)}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span>Amount Enclosed:</span>
                                <div className="h-[1px] w-[100px] bg-black mt-5" />
                                <span>
                                    Enter above the amount you are paying
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InvoiceCore;
