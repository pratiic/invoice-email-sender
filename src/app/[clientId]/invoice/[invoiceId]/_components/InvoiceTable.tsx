"use client";

import { Table } from "antd";

import { numToMonthMap } from "@/utils/date-time.utils";

interface IInvoiceTableProps {
    issueDate: Date;
    defaultAmount: number;
}

const InvoiceTable = ({ issueDate, defaultAmount }: IInvoiceTableProps) => {
    const dataSource = [
        {
            description: `Cleaning services for ${
                numToMonthMap[
                    issueDate.getMonth() as keyof typeof numToMonthMap
                ]
            }, ${issueDate.getFullYear()}`,
            defaultAmount,
        },
    ];

    const columns = [
        {
            title: "Item",
            dataIndex: "item",
            key: "item",
            render: () => {
                return "1";
            },
        },
        { title: "Description", dataIndex: "description", key: "description" },
        {
            title: "Quantity",
            key: "quantity",
            render: () => {
                return "1";
            },
        },
        {
            title: "Unit Price",
            dataIndex: "defaultAmount",
            key: "unitPrice",
            render: (defaultAmount: number) => {
                return <span>${defaultAmount}</span>;
            },
        },
        {
            title: "GST",
            render: () => {
                return <span>10%</span>;
            },
        },
        {
            title: "GST Amount",
            dataIndex: "defaultAmount",
            render: (defaultAmount: number) => {
                return <span>${0.1 * defaultAmount}</span>;
            },
        },
        {
            title: "Total Amount",
            dataIndex: "defaultAmount",
            render: (defaultAmount: number) => {
                return <span>${defaultAmount + defaultAmount * 0.1}</span>;
            },
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </div>
    );
};

export default InvoiceTable;
