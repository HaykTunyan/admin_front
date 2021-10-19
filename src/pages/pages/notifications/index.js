import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { MoreVertical } from "react-feather";
import {
  Divider as MuiDivider,
  Grid,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  FormControl as MuiFormControl,
  TextField as MuiTextField,
  Typography,
  Select,
  MenuItem,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

// Styele Component.
const Divider = styled(MuiDivider)(spacing);

const Card = styled(MuiCard)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const rows = [
  {
    id: 0,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
  {
    id: 1,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
  {
    id: 2,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
  {
    id: 3,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
  {
    id: 4,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="warning" />,
    sales: "1205",
  },
  {
    id: 5,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
  {
    id: 6,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="warning" />,
    sales: "1205",
  },
  {
    id: 7,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
  {
    id: 8,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="warning" />,
    sales: "1205",
  },
  {
    id: 9,
    name: "User Name",
    title: "This page contains a set of example notifications",
    type: <Chip label="type" color="success" />,
    sales: "1205",
  },
];

const Notifications = () => {
  const [selectNoficate, setSelectNotificate] = useState("1");

  const handleChange = (event) => {
    setSelectNotificate(event.target.value);
  };

  return (
    <Fragment>
      <Helmet title="Notification" />
      <Typography variant="h3" gutterBottom display="inline">
        Notification
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card mb={6}>
            <CardContent>
              <Card mb={6}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings" size="large">
                      <MoreVertical />
                    </IconButton>
                  }
                  title="Notification products list"
                />
                <Paper>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>User Name</TableCell>
                          <TableCell>Notification Title</TableCell>
                          <TableCell>Notification Type</TableCell>
                          <TableCell>Sends</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.sales}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableWrapper>
                </Paper>
              </Card>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spasing={6}>
        <Grid item xs={12}>
          <Card md={6}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Notification
              </Typography>
              <Divider my={5} />

              <Grid container spacing={6}>
                <Grid item md={6}>
                  <TextField
                    id="titleNotification"
                    label="Title Notification"
                    defaultValue="titleNotification"
                    variant="outlined"
                    fullWidth
                    my={2}
                  />
                  {/*  */}
                  <FormControl fullWidth my={2} variant="outlined">
                    <Select
                      value={selectNoficate}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="1">Arrest After Registrations</MenuItem>
                      <MenuItem value="2">Half Translation</MenuItem>
                      <MenuItem value="3">Correct Translation</MenuItem>
                      <MenuItem value="4">Deviated KYC</MenuItem>
                      <MenuItem value="5">Print KYC</MenuItem>
                    </Select>
                  </FormControl>
                  {/*  */}

                  <FormControl fullWidth my={2} variant="outlined">
                    <TextField
                      label="Notification Info"
                      id="info"
                      multiline={true}
                      rows={3}
                      maxRows={4}
                      variant="outlined"
                      defaultValue=" Send Notification for Users "
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button variant="contained" color="primary">
                New Notification
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Notifications;
