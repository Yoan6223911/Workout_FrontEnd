export default function Footer({}) {
  return (
    <>
      <footer>
        <a className="brand" href="#workouts">
          workout<span className="brand-dot">.</span>
        </a>
        <span>Du temps pour vous. De l’énergie pour la suite.</span>
        <small>© {new Date().getFullYear()} Workout · Projet de stage</small>
      </footer>
    </>
  );
}
