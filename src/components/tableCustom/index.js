import React from "react";
import { Row, TableBody } from "./style";

const TableCustom = ({ title, content, id }) => {
  return (
    <table>
      <thead>
        <tr>
          <th
            onClick={() => {
              console.log("e");
              let table = document.getElementsByTagName("table")[id];
              console.log(table);
              let tbody = table.getElementsByTagName("tbody")[0];
              if (tbody.style.display === "none") {
                tbody.style.display = "block";
              } else {
                tbody.style.display = "none";
              }
            }}
          >
            {title}
          </th>
        </tr>
      </thead>
      <TableBody style={{ display: "none" }}>
        {Object.entries(content).map(([key, value]) => {
          if (key === "tags") return null;
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {value === true
                  ? "true"
                  : value === false
                  ? "false"
                  : value === ""
                  ? "empty"
                  : value}
              </td>
            </tr>
          );
        })}
      </TableBody>
    </table>
  );
};

export default TableCustom;
