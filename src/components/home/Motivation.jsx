import { Activity } from "lucide-react";
export default function Motivation({}) {
  return (
    <>
      <aside className="motivation">
        <span className="motivation-icon">
          <Activity size={27} />
        </span>
        <div>
          <h3>Le plus dur, c’est de commencer.</h3>
          <p>
            Votre prochaine séance est un pas de plus dans la bonne direction.
          </p>
        </div>
        <span className="motivation-mark">LET’S MOVE ↗</span>
      </aside>
    </>
  );
}
