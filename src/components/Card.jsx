import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import TableCell from "@mui/material/TableCell";
import { useGetConvertQuery } from "../redux/api/exchangeApi";
import { isAllOf } from "@reduxjs/toolkit";

export default function CurrencyLists({
  fromValue,
  fullName,
  toValue,
  toFullName,
  reverse,
}) {
  const { data, isLoading } = useGetConvertQuery({
    to: reverse ? fromValue : toValue,
    from: reverse ? toValue : fromValue,
    amount: 1,
  });

  const rows = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 100000];
  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="flex bg-secondary p-5 justify-center">
        <h2 className="text-lg font-bold">
          {reverse ? fullName : toFullName} to {!reverse ? fullName : toFullName}
        </h2>
      </div>
      <div>
      <TableContainer
        sx={{borderRadius: 0 }}
        className="md:px-10"
        variant="none"
        component={Paper}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                {fromValue}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, fontSize: "1.2rem" }}
                align="right"
              >
                {toValue}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((i,index) => (
            <TableRow key={index}>
              <TableCell sx={{ fontSize: "1rem" }} component="th" scope="row">
                <span className="font-semibold">{i}</span> {fromValue}
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }} align="right">
                <span className={`${isLoading && "animate-pulse"}`}>
                  <span className={`${isLoading && "hidden"} font-semibold`}>{reverse ? (i/(data?.result)).toFixed(3) : (data?.result * i).toFixed(2)}</span> {toValue}
                </span>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}
