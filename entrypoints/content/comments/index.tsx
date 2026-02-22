import { useFormData } from "@/entrypoints/hooks/formData";
import Header from "../common/header";
import { useState } from "react";
import { IComment, IPost } from "../scripts/scrap";
import Search from "../common/Search";

interface CommentModalProps {
    post: IPost
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
    console.log("formData", formData)
    console.log("Post", post)

    const handleCommentClick = (comment: IComment) => {
        if (comment.permalink) {
            window.open(comment.permalink, "_blank", "noopener,noreferrer")
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
                <Search handleSearch={() => {}} />

                {loading && (
                    <p className="text-center text-canvas-text-contrast text-2xl py-8">
                        Loading...
                    </p>
                )}

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {comments.length === 0 ? (
                        <div className="text-center py-12 text-canvas-text">
                            No comments available.
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="border border-canvas-border/50 rounded-lg p-3 hover:border-canvas-border-hover/50 transition-all duration-200 bg-canvas-secondary cursor-pointer hover:shadow-md hover:shadow-canvas-border/70"
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
