"use client";

import { useEffect } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { createInvoice } from "@/actions/invoice.actions";
import { useWatch } from "antd/es/form/Form";

interface IInvoiceFormProps {
    defaultAmount: number;
}

const InvoiceForm = ({ defaultAmount }: IInvoiceFormProps) => {
    const [invoiceForm] = Form.useForm();
    const issueDateValue = useWatch("issueDate", invoiceForm) || dayjs();
    const amountValue = useWatch("amount", invoiceForm);

    const { clientId } = useParams();

    useEffect(() => {
        invoiceForm.setFieldValue(
            "dueDate",
            dayjs(issueDateValue).add(14, "days")
        );
    }, [issueDateValue]);

    useEffect(() => {
        const gstAmount = Number((0.1 * amountValue).toFixed(2));

        invoiceForm.setFieldsValue({
            gstAmount,
            totalAmount: Number(amountValue) + gstAmount,
        });
    }, [amountValue]);

    const handleFormFinish = async (formData: any) => {
        const invoicePeriodArr = [
            dayjs(formData.invoicePeriod).month(),
            dayjs(formData.invoicePeriod).year(),
        ] as [number, number];

        const invoice = await createInvoice(
            Number(clientId),
            formData.issueDate,
            formData.dueDate,
            invoicePeriodArr,
            Number(formData.amount)
        );

        console.log(invoice);
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
                        <DatePicker allowClear={false} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="dueDate" label="Due Date">
                        <DatePicker allowClear={false} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="servicePeriod" label="Service Period">
                        <DatePicker allowClear={false} picker="month" />
                    </Form.Item>
                </Col>

                <Col span={12} />

                <Col span={12}>
                    <Form.Item name="amount" label="Amount Before GST">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="gstAmount" label="Total GST">
                        <Input readOnly />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="totalAmount" label="Total Amount">
                        <Input readOnly />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Button
                        type="primary"
                        className="w-full"
                        icon={<FileTextOutlined />}
                        htmlType="submit"
                    >
                        Generate and Send Invoice
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default InvoiceForm;
