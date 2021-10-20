import React from "react";
import {
  Box,
  CardContent,
  Checkbox,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button as MuiButton,
  Card as MuiCard,
  FormControl as MuiFormControl,
  TextField as MuiTextField,
  Typography,
  Select,
  MenuItem,
  CardHeader,
  Chip as MuiChip,
} from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import Editors from "../../forms/Editors";
import TextFields from "../../forms/TextFields";
import AddNewsModal from "../../modal/AddNewsModal";
import { Edit2 } from "react-feather";
import {
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";
import AddAdminModal from "../../modal/AddAdminModal";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

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

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;

const rows = [
  {
    id: 0,
    name: "Admin Name",
    email: "admin@email.com",
    type: <Chip label="active" color="success" />,
  },
  {
    id: 1,
    name: "Admin Name",
    email: "admin@email.com",
    type: <Chip label="disable" color="error" />,
  },
  {
    id: 2,
    name: "Admin Name",
    email: "admin@email.com",
    type: <Chip label="active" color="success" />,
  },
  {
    id: 3,
    name: "Admin Name",
    email: "admin@email.com",
    type: <Chip label="active" color="success" />,
  },
  {
    id: 4,
    name: "Admin Name",
    email: "admin@email.com",
    type: <Chip label="active" color="success" />,
  },
  {
    id: 5,
    name: "Admin Name",
    email: "admin@email.com",
    type: <Chip label="active" color="success" />,
  },
];

const Administrators = () => {
  return (
    <>
      <Helmet title="Administrators" />

      <Grid justifyContent="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Administrators
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card mb={6}>
            <CardContent>
              <Card mb={6}>
                <CardHeader
                  action={<AddAdminModal />}
                  title="Admin User List"
                />
                <Paper>
                  <TableWrapper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Admin Name</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Admin Type</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">
                              <Box mr={2}>
                                <IconButton aria-label="details" size="large">
                                  <Edit2 />
                                </IconButton>
                              </Box>
                            </TableCell>
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
    </>
  );
};

export default Administrators;
