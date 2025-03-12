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
            issueDate,
            dueDate,
            servicePeriod,
            amount,
        },
    });

    return invoice;
};
