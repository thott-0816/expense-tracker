# Next.js + SpecKit + Context7

Project này dùng Next.js App Router và đã được khởi tạo SpecKit workflow cho GitHub Copilot.

## Prerequisites

- Node.js 24+
- npm
- VS Code (Copilot + MCP support)

## Run project

```bash
npm install
npm run dev
```

Mở `http://localhost:3000` để xem ứng dụng.

## SpecKit workflow

SpecKit đã được initialize trong workspace (`specify init --here --ai copilot`).
Bạn có thể dùng các slash commands sau trong Copilot Chat:

- `/speckit.constitution`
- `/speckit.specify`
- `/speckit.plan`
- `/speckit.tasks`
- `/speckit.implement`

Các command bổ sung:

- `/speckit.clarify`
- `/speckit.analyze`
- `/speckit.checklist`

## Context7 MCP setup (VS Code)

Workspace đã có file cấu hình MCP tại `.vscode/mcp.json` với server `context7`.

Hiện tại cấu hình dùng remote MCP URL nên có thể dùng ngay mà không cần nhập key.
Nếu cần rate limit cao hơn, bạn có thể bổ sung API key Context7 theo tài liệu chính thức.

## Useful scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
