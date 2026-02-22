import { useFormData } from "@/entrypoints/hooks/formData";
import Header from "../common/header";
import { useState } from "react";
import { IPost } from "../scripts/scrap";
import Search from "../common/Search";

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
    console.log("formData", formData);

    const handlePostClick = (post: IPost) => {
        if (post.link) {
            window.open(post.link, "_blank", "noopener,noreferrer")
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
                <Search handleSearch={() => {}} />

                {loading && (
                    <p className="text-center text-canvas-text-contrast text-2xl py-8">Loading...</p>
                )}

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {posts?.length === 0 ? (
                        <div className="text-center py-12 text-canvas-text">
                            No posts available.
                        </div>
                    ) : (
                        posts?.map((post) => (
                            <div
                                key={post.id}
                                className="border border-canvas-border/50 rounded-lg p-3 hover:border-canvas-border-hover/50 transition-all duration-200 bg-canvas-base cursor-pointer hover:shadow-md hover:shadow-canvas-border/70"
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