"use server";

import postmark from "postmark";

export const sendInvoiceEmail = async () => {
    const postmarkClient = new postmark.ServerClient(
        process.env.POSTMARK_API_KEY || ""
    );

    try {
        const res = await postmarkClient.sendEmail({
            From: "pratik.181731@ncit.edu.np",
            To: "pratikbhandari9292@gmail.com",
            Subject: "Great Purpose",
        });

        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
