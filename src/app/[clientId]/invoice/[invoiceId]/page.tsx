import prisma from "../../../../../lib/prisma";

import InvoiceCore from "./_components/InvoiceCore";

interface IInvoicePageProps {
    params: Promise<{ invoiceId: string }>;
}

const InvoicePage = async ({ params }: IInvoicePageProps) => {
    const { invoiceId } = await params;

    const invoice = await prisma.invoice.findUnique({
        where: { id: Number(invoiceId) },
        include: {
            client: true,
        },
    });

    if (!invoice) {
        return null;
    }

    return <InvoiceCore invoice={invoice} />;
};

export default InvoicePage;
