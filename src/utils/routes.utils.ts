const routes = {
    homePath: () => {
        return "/";
    },
    clientIdPath: (id: number) => {
        return `/${id}`;
    },
    invoiceIdPath: (clientId: number, invoiceId: number) => {
        return `/${clientId}/invoice/${invoiceId}`;
    },
};

export default routes;
