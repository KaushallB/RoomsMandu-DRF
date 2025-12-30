'use client';

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";

import CustomButton from "../forms/CustomButton";

interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}
const Conversations:React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.id != userId )

    return (
        <div className="cursor-pointer px-6 py-4 borderborder-gray-300 rounded-xl">
            <p className="mb-6 text-xl">{otherUser?.name}</p>

            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-red-400">
                    Go to conversation
            </p>
        </div>
        
    )
}

export default Conversations;