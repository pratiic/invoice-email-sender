import prisma from "../../../lib/prisma";

import ClientCard from "./ClientCard";

const ClientsList = async () => {
    const clients = await prisma.client.findMany();

    return (
        <section className="space-y-3">
            {clients.map((client) => {
                return <ClientCard {...client} key={client.id} />;
            })}
        </section>
    );
};

export default ClientsList;
