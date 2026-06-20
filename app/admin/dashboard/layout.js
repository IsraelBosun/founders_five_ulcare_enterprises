import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F5F4F1]">
      <Sidebar />
      <main className="flex-1 md:ml-60 min-h-screen px-4 pt-[4.5rem] pb-[5.5rem] md:px-8 md:pt-8 md:pb-8 animate-fade-up">
        {children}
      </main>
    </div>
  );
}
