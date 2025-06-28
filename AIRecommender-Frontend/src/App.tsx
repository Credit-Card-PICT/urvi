import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { ChatProvider } from "./context/ChatContext";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import TaskManagerPage from "./pages/TaskManagerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChatProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/task-manager" element={<TaskManagerPage />} />
              </Routes>
              <Toaster />
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ChatProvider>
  );
}

export default App;
