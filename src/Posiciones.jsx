import { useState } from "react";

const base_url =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export function Posiciones({ title, jobId, candidateId, userUuid }) {
  const [githubUrl, setGithubUrl] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    setIsSending(true);
    const payload = {
      uuid: userUuid,
      jobId: jobId,
      candidateId: candidateId,
      repoUrl: githubUrl,
    };
    try {
      const response = await fetch(base_url + "/api/candidate/apply-to-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Te has postulado correctamente para ${title}`);
        setGithubUrl("");
      } else {
        const errorText = await response.text();
        alert(`Error en la postulación: ${errorText}`);
      }
    } catch (error) {
      alert(`Error inesperado: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

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
          id={`github-url-${jobId}`}
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          disabled={isSending}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleSubmit}
          disabled={isSending}
        >
          {isSending ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Enviando...
            </>
          ) : (
            "Postularme"
          )}
        </button>
      </main>
    </article>
  );
}
