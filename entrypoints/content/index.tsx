import ReactDOM from "react-dom/client";
import "../popup/style.css"
import { CreateContentElement } from "./common";
import PostModal from "./posts";
import { ContentScriptContext } from "wxt/utils/content-script-context";
import CommentModal from "./comments";
import { extractRedditCommentsFromDOM, extractRedditPostsFromDOM } from "./scripts/scrap";
import { attachThemeToElement } from "./common/theme";

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        switch (message.action) {
          case "post":
            const postUI = await CreateUI(ctx, "posts");
            postUI.mount();
            break;

          case "comment":
            const commentUI = await CreateUI(ctx, "comments");
            commentUI.mount();
            break;

          default:
            break;
        }
      }
    )
  },
});

const CreateUI = async (
  ctx: ContentScriptContext,
  type: "posts" | "comments"
) => {
  let detachTheme: undefined | (() => void);

  return createShadowRootUi(ctx, {
    name: "post-element",
    position: "inline",
    onMount: (uiContainer, shadow, shadowContainer) => {
      void attachThemeToElement(uiContainer).then((detach) => {
        detachTheme = detach;
      });

      return CreateContentElement(uiContainer, shadowContainer, (root) => {
        const onRemove = () => {
          root?.unmount();
          uiContainer.style.display = "none";
          shadowContainer.style.visibility = "hidden";
        };

        const posts = extractRedditPostsFromDOM();
        const comments = extractRedditCommentsFromDOM()

        switch (type) {
          case "posts":
            return <PostModal posts={posts} onRemove={onRemove} />;

          case "comments":
            return <CommentModal post={posts[0]} comments={comments} onRemove={onRemove} />;

          default:
            return "";
        }

      }) as ReactDOM.Root;
    },
    onRemove(root) {
      detachTheme?.();
      root?.unmount();
    },
  });
}