import ClientsList from "./_components/ClientsList";

export default async function Home() {
    return (
        <section className="space-y-3">
            <h1 className="text-lg font-semibold text-center">
                Active Clients
            </h1>

            <ClientsList />
        </section>
    );
}
