const routes = {
    homePath: () => {
        return "/";
    },
    clientIdPath: (id: number) => {
        return `/${id}`;
    },
};

export default routes;
