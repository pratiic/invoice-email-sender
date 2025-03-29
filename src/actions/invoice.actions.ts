"use server";

import prisma from "../../lib/prisma";

export const createInvoice = async (
    clientId: number,
    issueDate: string,
    dueDate: string,
    servicePeriod: [number, number],
    amount: number
) => {
    const invoice = await prisma.invoice.create({
        data: {
            clientId,
            issueDate: new Date(issueDate),
            dueDate: new Date(dueDate),
            servicePeriod,
            amount,
        },
    });

    return invoice;
};
