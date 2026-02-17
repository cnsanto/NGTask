import { useState } from "react";
import { applyToJob } from "./postData";

const base_url =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export function Posiciones({
  title,
  jobId,
  candidateId,
  applicationId,
  userUuid,
}) {
  const [githubUrl, setGithubUrl] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    setIsSending(true);
    const payload = {
      uuid: userUuid,
      jobId: jobId,
      candidateId: candidateId,
      //applicationId: applicationId, //no esta en el body especificado de la API
      repoUrl: githubUrl,
    };
    try {
      await applyToJob(payload, "/api/candidate/apply-to-job");
      alert(`Te has postulado correctamente para ${title}`);
      setGithubUrl("");
    } catch (error) {
      alert(`Error en la postulación: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  /** el body tiene que ser:
   * {
   * "uuid": "tu uuid (del Step 2)",
   * "jobId": "id de la posición (del Step 3)",
   * "candidateId": "tu candidateId (del Step 2)",
   * "repoUrl": "https://github.com/tu-usuario/tu-repo"
   * }
   */

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
