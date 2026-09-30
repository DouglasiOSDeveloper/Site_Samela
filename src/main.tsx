import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import App from "./app/App.tsx"
import ServicePage from "./app/ServicePage.tsx"
import NotFound from "./app/NotFound.tsx"
import ContentHub from "./app/ContentHub.tsx"
import ContentPage from "./app/ContentPage.tsx"
import { servicePages } from "./app/seo/servicePages"
import { contentPages } from "./app/seo/contentPages"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      {servicePages.map((page) => (
        <Route key={page.slug} path={`/${page.slug}`} element={<ServicePage page={page} />} />
      ))}
      <Route path="/conteudos" element={<ContentHub />} />
      {contentPages.map((page) => (
        <Route key={page.slug} path={`/conteudos/${page.slug}`} element={<ContentPage page={page} />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
)
