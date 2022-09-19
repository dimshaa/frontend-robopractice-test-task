import api from "../utils/Api";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";

export const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [query, setQuery] = useState('');
  const [usersDataToRender, setUsersDataToRender] = useState([])

  useEffect(() => {
    api.getData()
      .then(users => {
        setUsersData(users);
      })
      .catch(err => console.log(err));
  }, []);

  const strToMinutes = (str) => {
    const hours = parseInt(str.split('-')[0]);
    const minutes = parseInt(str.split('-')[1]);

    return hours * 60 + minutes;
  }

  const countSpentTime = (time) => {

    return `${parseInt(time / 60)}:${time % 60}`;
  }

  const mappedUserData = usersData.map(user => {
    let arr = new Array(31).fill(0);
    let totalSpent = 0;

    user.Days.map((day) => {
      arr[new Date(day.Date).getDate() - 1] = {
        date: new Date(day.Date).getDate(),
        start: strToMinutes(day.Start),
        end: strToMinutes(day.End),
        spent: strToMinutes(day.End) - strToMinutes(day.Start),
      }

      return totalSpent += (strToMinutes(day.End) - strToMinutes(day.Start));
    });

    return { id: user.id, fullname: user.Fullname, days: arr, totalSpent };
  });

  const handleUserSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  }

  useEffect(() => {
    let result = mappedUserData.filter((user) => user.fullname.toLowerCase().includes(query));
    setUsersDataToRender(result);
  }, [query, mappedUserData]);

  return (
    <>
    <TextField onChange={handleUserSearch} value={query} label="Search" variant="standard"></TextField>
    <Table>
      <TableBody>
        {usersDataToRender &&
          usersDataToRender.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  {user.fullname}
                </TableCell>
                {user.days.map((day, index) => {
                  return (
                    <TableCell key={index}>
                      {(day.date) ? countSpentTime(day.spent) : 0}
                    </TableCell>
                  )
                })}
                <TableCell>
                  {countSpentTime(user.totalSpent)}
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
    </>
  );
}
