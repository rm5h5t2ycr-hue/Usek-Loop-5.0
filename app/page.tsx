import USEKApp from '@/components/USEKApp'

export default function Home() {
  return <USEKApp />
}
```

Click **Commit**.

---

### 7. Verify Your File Structure

Your GitHub repo should look like this:
```
/app
  ├── globals.css
  ├── layout.tsx
  └── page.tsx
/components
  └── USEKApp.tsx
tailwind.config.js
postcss.config.js
package.json
tsconfig.json
next.config.js (if you have it)
