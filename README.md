# Reddit Insights Extension

A powerful browser extension that leverages OpenAI to provide deep insights into Reddit posts and comments, helping you understand discussions at a glance.

## 🚀 Features

- **AI-Powered Analysis**: Get instant insights on Reddit posts and comments using OpenAI's advanced language models
- **Simple Setup**: No authentication required - just add your OpenAI API key and start analyzing
- **Real-Time Insights**: Analyze any Reddit post or comment thread directly from your browser
- **Clean Interface**: Built with shadcn/ui components for a modern, intuitive user experience
- **Privacy-Focused**: Your API key is stored locally in your browser

## 🛠️ Tech Stack

- **Framework**: [WXT](https://wxt.dev/) - Next-generation web extension framework
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI**: OpenAI API

## 📦 Installation

### From Source

1. Clone the repository:
```bash
git clone https://github.com/faizan-devstack/wxt-extension
cd wxt-extension
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

Start the development server with hot reload:

```bash
npm run dev
# or
pnpm dev
```

## 💡 Usage

1. **Setup**: Click the extension icon and enter your OpenAI API key in the popup
2. **Analyze**: Navigate to any Reddit post/feed
3. **Get Insights**: Right click and you will see the WXT Extension in pop-up

### What You'll Get

- **Find related Posts**: Find the related post on specific topic
- **Comment Sentiment**: Analysis of overall sentiment in discussions
- **Key Topics**: Main themes and topics being discussed
- **Notable Comments**: Highlights of the most insightful or popular comments
- **Discussion Quality**: Assessment of conversation depth and engagement

## 🔐 Privacy & Security

- Your OpenAI API key is stored locally using the browser's storage API
- No data is sent to any server except OpenAI's API
- The extension only activates on reddit.com domains
- No tracking or analytics included

## 📝 Configuration

The extension uses the following OpenAI model:
- Default model: `gpt-4.1-mini`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [WXT](https://wxt.dev/) for the excellent extension framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [OpenAI](https://openai.com/) for powerful AI capabilities

## 📧 Contact

For questions, suggestions, or feedback, please open an issue on GitHub.

---

**Note**: This extension requires an OpenAI API key. Usage costs are based on OpenAI's pricing. Please monitor your API usage to avoid unexpected charges.