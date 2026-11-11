import { Check } from "lucide-react";
import { useWorkoutApp } from "./hooks/useWorkoutApp";
import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import LibraryStats from "./components/home/LibraryStats";
import Library from "./components/library/Library";
import Motivation from "./components/home/Motivation";
import Footer from "./components/layout/Footer";
import EntityModal from "./components/forms/EntityModal";
export default function App() {
  const app = useWorkoutApp();
  const { entityId, isExercise, light, setLight, open, data, notice } = app;
  return (
    <>
      <Header isExercise={isExercise} light={light} setLight={setLight} />
      <main>
        <div className="topline">
          <span>
            <span className="status-dot" /> VOTRE ESPACE FITNESS
          </span>
        </div>
        {!entityId && <Hero isExercise={isExercise} open={open} />}
        {!entityId && <LibraryStats data={data} />}
        <Library {...app} />
        <Motivation />
      </main>
      <Footer />
      {notice && (
        <div className="toast" role="status">
          <Check size={18} />
          {notice}
        </div>
      )}
      {app.modal && <EntityModal {...app} />}
    </>
  );
}
