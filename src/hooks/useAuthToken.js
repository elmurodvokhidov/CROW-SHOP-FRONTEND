import { useSession } from "@clerk/clerk-react";

export const useAuthToken = () => {
    const { session } = useSession();

    const getToken = async () => {
        if (session) {
            const token = await session.getToken();
            return token;
        }
        return null;
    };

    return getToken;
};