"use client";

import { useState, useEffect, useRef } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useWatch } from "antd/es/form/Form";

import { createInvoice } from "@/actions/invoice.actions";
import routes from "@/utils/routes.utils";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IInvoiceFormProps {
    defaultAmount: number;
}

const InvoiceForm = ({ defaultAmount }: IInvoiceFormProps) => {
    const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

    const invoiceRef = useRef<HTMLDivElement | null>(null);

    const [invoiceForm] = Form.useForm();
    const issueDateValue = useWatch("issueDate", invoiceForm) || dayjs();
    const amountValue = useWatch("amount", invoiceForm);

    const { clientId } = useParams();
    const router = useRouter();

    useEffect(() => {
        invoiceForm.setFieldValue(
            "dueDate",
            dayjs(issueDateValue).add(14, "days")
        );
    }, [issueDateValue, invoiceForm]);

    useEffect(() => {
        const gstAmount = Number((0.1 * amountValue).toFixed(2));

        invoiceForm.setFieldsValue({
            gstAmount,
            totalAmount: Number(amountValue) + gstAmount,
        });
    }, [amountValue, invoiceForm]);

    const downloadInvoice = async () => {
        if (!invoiceRef.current) {
            return;
        }

        const canvas = await html2canvas(invoiceRef?.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/jpeg", 0.7);

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save(`Invoice.pdf`);
    };

    const handleFormFinish = async (formData: any) => {
        const invoicePeriodArr = [
            dayjs(formData.invoicePeriod).month(),
            dayjs(formData.invoicePeriod).year(),
        ] as [number, number];

        setIsCreatingInvoice(true);

        const invoice = await createInvoice(
            Number(clientId),
            formData.issueDate.toISOString(),
            formData.dueDate.toISOString(),
            invoicePeriodArr,
            Number(formData.amount)
        );

        setIsCreatingInvoice(false);
        router.push(routes.invoiceIdPath(Number(clientId), invoice.id));
    };

    return (
        <Form
            onFinish={handleFormFinish}
            form={invoiceForm}
            initialValues={{
                issueDate: issueDateValue,
                dueDate: dayjs().add(14, "days"),
                servicePeriod: dayjs().subtract(1, "month"),
                amount: defaultAmount,
                gstAmount: "85",
                totalAmount: "935",
            }}
        >
            <Row gutter={[22, 0]}>
                <Col span={12}>
                    <Form.Item name="issueDate" label="Issue Date">
                        <DatePicker allowClear={false} format="DD MMMM YYYY" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="dueDate" label="Due Date">
                        <DatePicker allowClear={false} format="DD MMMM YYYY" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="servicePeriod" label="Service Period">
                        <DatePicker
                            allowClear={false}
                            picker="month"
                            format="MMMM YYYY"
                        />
                    </Form.Item>
                </Col>

                <Col span={12} />

                <Col span={12}>
                    <Form.Item name="amount" label="Amount Before GST">
                        <Input prefix="$" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="gstAmount" label="Total GST">
                        <Input readOnly prefix="$" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="totalAmount" label="Total Amount">
                        <Input readOnly prefix="$" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Button
                        type="primary"
                        className="w-full"
                        icon={<FileTextOutlined />}
                        htmlType="submit"
                        loading={isCreatingInvoice}
                    >
                        Generate Invoice
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default InvoiceForm;
