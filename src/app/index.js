import api from "../utils/Api";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";

export const App = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    api.getData()
      .then(users => {
        console.log(users[0]);
        setUsersData(users);
      })
      .catch(err => console.log(err));
  }, []);

  const strToMinutes = (str) => {
    const hours = parseInt(str.split('-')[0]);
    const minutes = parseInt(str.split('-')[1]);

    return hours * 60 + minutes;
  }

  const spentTime = (start, end) => {
    const time = strToMinutes(end) - strToMinutes(start);

    return `${parseInt(time / 60)}:${time % 60}`
  }

  return (
    <Table>
      <TableBody>
        {
          usersData.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  {user.Fullname}
                </TableCell>
                {user.Days.map((day, index) => {
                  return (
                    <TableCell key={index}>
                      {day ? spentTime(day.Start, day.End) : 0}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}
