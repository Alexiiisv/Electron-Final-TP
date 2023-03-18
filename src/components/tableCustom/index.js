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
        {content.split(",").map((a) => {
          return (
            <tr key={a}>
              <Row>{a}</Row>
            </tr>
          );
        })}
      </TableBody>
    </table>
  );
};

export default TableCustom;
