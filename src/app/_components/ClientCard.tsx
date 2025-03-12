import { Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";

import routes from "@/utils/routes.utils";

const ClientCard = ({ id, name, address, email }: IClient) => {
    return (
        <div className="p-3 bg-gray-100 rounded border-gray-200 w-full space-y-3">
            <div className="space-y-1">
                <h3 className="font-semibold">{name}</h3>

                <h4 className="text-gray-700 text-sm">{address}</h4>

                <h4 className="text-gray-700 text-sm">{email}</h4>
            </div>

            <Link href={routes.clientIdPath(id)}>
                <Button type="primary" icon={<FileTextOutlined />}>
                    Generate Invoice
                </Button>
            </Link>
        </div>
    );
};

export default ClientCard;
