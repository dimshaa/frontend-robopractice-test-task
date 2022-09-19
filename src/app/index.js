import api from "../utils/Api";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";

export const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [query, setQuery] = useState('');
  const [usersDataToRender, setUsersDataToRender] = useState([])

  useEffect(() => {
    api.getData()
      .then(users => {
        setUsersData(users);
        setDataIsLoaded(true);
      })
      .catch(err => console.log(err));
  }, []);

  const strToMinutes = (str) => {
    const hours = parseInt(str.split('-')[0]);
    const minutes = parseInt(str.split('-')[1]);

    return hours * 60 + minutes;
  }

  const countSpentTime = (time) => `${parseInt(time / 60)}:${time % 60}`

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
    let result = mappedUserData.filter(user => user.fullname.toLowerCase().includes(query));
    setUsersDataToRender(result);
  }, [query, dataIsLoaded]);

  return (
    <>
    <TextField onChange={handleUserSearch} value={query} label="Search" variant="standard"></TextField>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>1</TableCell>
          <TableCell>2</TableCell>
          <TableCell>3</TableCell>
          <TableCell>4</TableCell>
          <TableCell>5</TableCell>
          <TableCell>6</TableCell>
          <TableCell>7</TableCell>
          <TableCell>8</TableCell>
          <TableCell>9</TableCell>
          <TableCell>10</TableCell>
          <TableCell>11</TableCell>
          <TableCell>12</TableCell>
          <TableCell>13</TableCell>
          <TableCell>14</TableCell>
          <TableCell>15</TableCell>
          <TableCell>16</TableCell>
          <TableCell>17</TableCell>
          <TableCell>18</TableCell>
          <TableCell>19</TableCell>
          <TableCell>20</TableCell>
          <TableCell>21</TableCell>
          <TableCell>22</TableCell>
          <TableCell>23</TableCell>
          <TableCell>24</TableCell>
          <TableCell>25</TableCell>
          <TableCell>26</TableCell>
          <TableCell>27</TableCell>
          <TableCell>28</TableCell>
          <TableCell>29</TableCell>
          <TableCell>30</TableCell>
          <TableCell>31</TableCell>
          <TableCell>Montly Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataIsLoaded &&
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
