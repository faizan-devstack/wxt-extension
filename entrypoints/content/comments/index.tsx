import { useFormData } from "@/entrypoints/hooks/formData";
import Header from "../common/header";
import { useState } from "react";
import { IComment, IPost } from "../scripts/scrap";
import Search from "../common/search";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface CommentModalProps {
    post: IPost[]
    comments: IComment[];
    onRemove: () => void;
}

export default function CommentModal({
    post,
    comments,
    onRemove
}: CommentModalProps) {
    const { formData } = useFormData();
    const [loading, setLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState<string>("");

    console.log("formData", formData)
    console.log("Post", post)

    const handleCommentClick = (comment: IComment) => {
        if (comment.permalink) {
            window.open(comment.permalink, "_blank", "noopener,noreferrer")
        }
    };

    const handleSearch = async (searchQuery: string) => {
        setLoading(true);
        setAiResponse("");

        try {
            const openai = new OpenAI({
                apiKey: formData?.apiKey,
                dangerouslyAllowBrowser: true,
            });

            const prompt = `
                This is the prompt: ${searchQuery}

                This is the dataset of comments in js array: '''${JSON.stringify(comments)}'''
                This is the post dataset: '''${JSON.stringify(post[0])}'''

                Now based on this comments dataset and the prompt,
                give me a well-structured markdown response that answers what the prompt asked.

                Use the comment text, author, and score to provide relevant insights.
                Structure your answer with headings, bullet points, and blockquotes when quoting comments.
                Highlight the most relevant comments.
                If no relevant comments match the query, just respond with:
                
                **No relevant comments found for this query.**

                Output ONLY valid markdown. No extra text, no code fences, no explanations outside the markdown.
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

            const data = completion.choices?.[0]?.message?.content?.trim() || "";
            setAiResponse(data);
        } catch (error) {
            toast.error("API error generating response");
            setAiResponse("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-3">
            <div className="rounded-xl overflow-hidden flex flex-col w-full max-w-2xl h-[70vh] bg-canvas-base">
                <Header
                    title="All Comments"
                    count={comments.length}
                    onRemove={onRemove}
                />
                <Search handleSearch={handleSearch} />

                {loading && (
                    <p className="text-center text-canvas-text-contrast text-2xl py-8">
                        Loading...
                    </p>
                )}

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {aiResponse ? (
                        <div className="prose prose-invert prose-headings:text-canvas-text-contrast prose-p:text-canvas-text max-w-none bg-canvas-base rounded-xl p-6 border border-canvas-border/50">
                            <ReactMarkdown>{aiResponse}</ReactMarkdown>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-12 text-canvas-text">
                            No comments available.
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border border-canvas-border/50 rounded-lg p-3 transition-all duration-300 bg-canvas-base cursor-pointer hover:shadow-md hover:shadow-primary-solid/20 hover:bg-primary-bg-subtle hover:border-primary-border/50"
                                onClick={() => handleCommentClick(comment)}
                            >
                                <div className="flex items-center gap-3 mb-3 justify-between flex-wrap">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium text-canvas-text-contrast border border-canvas-border/50">
                                        @ {comment.author}
                                    </span>
                                    <span className="text-sm text-canvas-text flex items-center gap-1">
                                        score: {comment.score}
                                    </span>
                                </div>

                                <p className="text-sm text-canvas-text leading-relaxed">
                                    {comment.comment}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}