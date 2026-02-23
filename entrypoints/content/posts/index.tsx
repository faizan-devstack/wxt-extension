import { useFormData } from "@/entrypoints/hooks/formData";
import Header from "../common/header";
import { useState } from "react";
import { extractJsonListFromMarkdown, IPost } from "../scripts/scrap";
import Search from "../common/search";
import { toast } from "sonner";
import OpenAI from "openai";

interface PostModalProps {
    posts: IPost[]
    onRemove: () => void;
}

export default function PostModal({
    posts,
    onRemove
}: PostModalProps) {
    const { formData } = useFormData();
    const [loading, setLoading] = useState(false);
    const [geminiResponse, setGeminiResponse] = useState<IPost[]>([]);

    const handlePostClick = (post: IPost) => {
        if (post.link) {
            window.open(post.link, "_blank", "noopener,noreferrer")
        }
    };

    const handleSearch = async (searchQuery: string) => {
        setLoading(true);
        setGeminiResponse([]);

        try {
            const openai = new OpenAI({
                apiKey: formData?.apiKey,
                dangerouslyAllowBrowser: true,
            });

            const prompt = `
                This is the prompt: ${searchQuery}

                This is the dataset of posts in js array: '''${JSON.stringify(posts)}'''

                Now based on this post dataset and the prompt,
                give me all the related posts matched with what prompt asked,
                Use title, description, tag, score, comments, for matching most relevant posts.
                Give me the list of posts with the same format as I have given you.
                Don't give me any extra text even if you failed to find any post.
                Just give me empty array if not match found.
                And if found give me the list of posts with the same data format.
            `;

            const completion = await openai.chat.completions.create({
                model: "gpt-4.1-mini",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0,
            });

            const data = completion.choices?.[0]?.message?.content;
            const extractedData = extractJsonListFromMarkdown(data as string) as IPost[];

            console.info(extractedData);
            setGeminiResponse(extractedData);
        } catch (error) {
            toast.error("API error generating response");
            setGeminiResponse([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-3">
            <div id="reddit-modal" className="rounded-xl overflow-hidden flex flex-col w-full max-w-2xl h-[70vh] bg-canvas-base">
                <Header
                    title="Selected Posts"
                    count={posts?.length}
                    onRemove={onRemove}
                />
                <Search handleSearch={handleSearch} />

                {loading && (
                    <p className="text-center text-canvas-text-contrast text-lg py-8">Loading...</p>
                )}

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {(geminiResponse.length > 0 ? geminiResponse : posts)?.length === 0 ? (
                        <div className="text-center py-12 text-canvas-text">
                            No posts available.
                        </div>
                    ) : (
                        (geminiResponse.length > 0 ? geminiResponse : posts)?.map((post) => (
                            <div
                                key={post.id}
                                className="border border-canvas-border/50 rounded-lg p-3 transition-all duration-300 bg-canvas-base cursor-pointer hover:shadow-md hover:shadow-primary-solid/20 hover:bg-primary-bg-subtle hover:border-primary-border/50"
                                onClick={() => handlePostClick(post)}
                            >
                                {post?.tag && (
                                    <span className="inline-flex items-center justify-center mb-3 px-3 py-1 rounded-full text-sm font-medium text-canvas-text border border-canvas-border/50">
                                        {post?.tag}
                                    </span>
                                )}

                                <h3 className="text-[15px] font-medium leading-tight mb-2 text-canvas-text-contrast">
                                    {post?.title}
                                </h3>

                                <p className="text-sm text-canvas-text line-clamp-2 sm:line-clamp-3">
                                    {post?.description}
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm text-canvas-text">
                                        score: {post?.score}
                                    </span>
                                    <span className="text-sm text-canvas-text">
                                        comments: {post?.comments}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}