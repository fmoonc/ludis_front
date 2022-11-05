import React from "react";

export default function TableLogs({ logs, loading }) {
  return (
    <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible mb-6">
      <table className="table table-striped ">
        <thead>
          <tr>
            <th className="whitespace-nowrap">Responsable</th>
            <th className="whitespace-nowrap">Descripción</th>
            <th className="whitespace-nowrap">Acción</th>
            <th className="text-center whitespace-nowrap">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            logs.map((log) => (
              <tr key={log.id} className="intro-x h-10">
                <td className="w-40">
                  <p>{log.causer.name}</p>
                </td>

                <td className="w-120">
                  <p>{log.description}</p>
                </td>
                <td className="w-120">
                  <p>{log.action}</p>
                </td>
                <td className="">
                  <p>{log.date}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
