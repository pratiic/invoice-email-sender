import prisma from "../../../lib/prisma";

import InvoiceForm from "./_components/InvoiceForm";

interface IClientPageProps {
    params: Promise<{ clientId: string }>;
}

export async function generateStaticParams() {
    const clients = await prisma.client.findMany();

    return clients.map((client) => {
        return { clientId: String(client.id) };
    });
}

const ClientPage = async ({ params }: IClientPageProps) => {
    const { clientId } = await params;

    const client = await prisma.client.findUnique({
        where: { id: Number(clientId) },
    });

    if (!client) {
        return null;
    }

    return (
        <section className="space-y-3">
            <div className="space-y-1">
                <h3 className="font-semibold">{client?.name}</h3>
                <h5 className="text-sm text-gray-700">{client?.address}</h5>
                <h5 className="text-sm text-gray-700">{client?.email}</h5>
            </div>

            <InvoiceForm defaultAmount={client.defaultAmount} />
        </section>
    );
};

export default ClientPage;
