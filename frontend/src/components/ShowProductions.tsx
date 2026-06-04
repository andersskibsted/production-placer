import { useState, useEffect } from "react"
import { useData } from "../context/DataContext"
import { fetchProductions } from "../api/productions"

export function ShowProduction() {
  const { productions } = useData()

  return (
    <div>
      <h3>Current productions.</h3>
            <table style={{ margin: '0 auto' }}>
                <thead>
                    <tr>
                        <th>Production ID</th>
                        <th>Production name</th>
                        <th>In region</th>
                        <th>Crops used in production</th>
                    </tr>
                </thead>
                <tbody>
                    {productions.map((row, index) => {
                      const prev = productions[index - 1];
                      const isDuplicate = prev && prev.id === row.id;
                      return (
                          <tr key={`${row.id}-${row.crop}`}>
                              <td>{isDuplicate ? "" : row.id}</td>
                              <td>{isDuplicate ? "" : row.name}</td>
                              <td>{isDuplicate ? "" : row.region}</td>
                              <td>{row.crop}</td>
                          </tr>
                      );
                  })}
                </tbody>
            </table>
    </div>
  )

}
