import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default function AppAll({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
