export function Posiciones({ title }) {
  return (
    <article className="posicion-card">
      <header>
        <h1 className="h4 mt-1">{title}</h1>
      </header>
      <main>
        <label className="form-text mb-2" htmlFor="github-url">
          Para postularte deberás ingresar la URL de tu repositorio de GitHub
        </label>
        <input
          type="text"
          className="form-control mt-2 mb-2"
          placeholder="https://github.com/tu-usuario/tu-repo"
          id="github-url"
        />
        <button className="btn btn-primary mt-2">Submit</button>
      </main>
    </article>
  );
}
