import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useLocation } from "react-router-dom";
import {
  Card as MuiCard,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip as MuiChip,
} from "@material-ui/core";
import { getUserActivity_req } from "../../../../api/userActivityAPI";
import moment from "moment";

// Spacing.
const Card = styled(MuiCard)(spacing);

// Custom Style.
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const Activity = () => {
  // hooks.
  const location = useLocation();
  const profileId = location?.state;
  const userId = profileId?.id;
  const [activity, setActivity] = useState([]);

  async function getAccountActivity() {
    try {
      const response = await getUserActivity_req(userId);
      if (response) {
        setActivity(response.activity);
      }
    } catch (e) {}
  }

  useEffect(() => {
    getAccountActivity();
  }, []);

  return (
    <>
      <Card mb={6}>
        <CardHeader title="Account Activity" />
        <Paper>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Device</TableCell>
                  <TableCell align="center">Activity</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">IP address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activity.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell>
                      {moment(row.creationDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">{row.source}</TableCell>
                    <TableCell align="center">{row.message}</TableCell>
                    <TableCell align="center">
                      {
                        <Chip
                          label={row.status}
                          color={row.status === "failed" ? "error" : "success"}
                        />
                      }
                    </TableCell>
                    <TableCell align="center">{row.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </Paper>
      </Card>
    </>
  );
};

export default Activity;
