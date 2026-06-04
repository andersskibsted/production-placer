import { useState } from "react"
import { useData } from "../context/DataContext"
import { deleteProduction} from "../api/productions"

export function DeleteProduction() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { loadProductions } = useData()
  const [id, setId] = useState<number>(0);

  const isValidId = (id: number): boolean => {
    const regex = /^[1-9][0-9]*$/; // Requires capital starting letter followed by 0 or more letters with an optional whitespace. Lastly the name can be finised with a number.
    const str_id = String(id);
    console.log(str_id);
    return regex.test(str_id);
  };


  function handleDeletion() {
    if (isValidId(id)) {
    setError(null);

    deleteProduction(id)
      .then(() => loadProductions())
      .catch((err) => setError(err.message))
    } else {
      setError("Not a valid production id.")
    }
  }

  return (
    <div>
      <h3>Delete production in the database. Enter production ID below.</h3>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="Production id"
      />

      <button onClick={handleDeletion} style={{ backgroundColor: 'red', color: 'white' }}>Delete production</button>
      {success &&
        <p>Production with {id} has been deleted!
                  </p>}
      {error && <p>{error}</p>}
    </div>
  )

}
