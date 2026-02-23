import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({browser, manifestVersion, mode, command}) => {
    return{
      manifest_version: 2,
      name: "WXT Extension",
      description: "Reddit posts & comments reader",
      version:"1.0.0",
      permissions: [
        "storage",
         "tabs",
         "activeTab",
         "scripting",
         "contextMenus",
         "declarativeNetRequest"
      ]
    }
  }
});
