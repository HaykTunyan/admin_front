import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { spacing } from "@material-ui/system";
import {
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  Box,
  Typography as MuiTypography,
  Card as MuiCard,
  CardContent,
  TablePagination,
} from "@material-ui/core";
import AddNewsModal from "../../modal/AddNewsModal";
import NewsCard from "./NewCard";
import {
  deleteNews_req,
  getNews_req,
  publishNews_req,
} from "../../api/newsAPI";
import moment from "moment";
import ConfirmationNotice from "../../components/ConfirmationNotice";
import Loader from "../../components/Loader";

// Spacing.
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Spacer = styled.div(spacing);

// Custom Style.
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) =>
    props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const NewsComponent = () => {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [message, setMessage] = useState({
    open: false,
    error: false,
    type: "delete",
  });

  const handleChangePage = (event, newPage) => {
    getNews(newPage + 1);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  async function getNews(page, rowsPerPage) {
    try {
      const response = await getNews_req(page, rowsPerPage);
      if (response) {
        setNewsList(response);
      }
    } catch (e) {}
  }

  async function deleteNews(id) {
    setMessage({ ...message, open: false, error: false, type: "delete" });
    try {
      const response = await deleteNews_req(id);
      if (response) {
        getNews();
        setMessage({ ...message, open: true, type: "delete" });
      }
    } catch (e) {
      setMessage({ ...message, open: true, error: true });
    }
  }

  async function publishNews(id) {
    setMessage({ ...message, open: false, error: false, type: "publish" });
    const formData = new FormData();
    const status = true;

    formData.append("_id", id);
    formData.append("published", status);

    try {
      const response = await publishNews_req(formData);
      if (response) {
        getNews();
        setMessage({ ...message, open: true, type: "publish" });
      }
    } catch (e) {
      setMessage({ ...message, open: true, error: true });
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Fragment>
      <Helmet title="News" />
      <Grid container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            News
          </Typography>
        </Grid>
      </Grid>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card xs={12}>
            <CardContent>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                spacing={6}
              >
                <Spacer mx={1} />
                <Grid display="flex" alignItems="center">
                  <AddNewsModal getNews={getNews} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {newsList.news &&
          newsList.news.map((item) => (
            <Grid item xs={12} md={6} lg={6} xl={3} key={item._id}>
              <NewsCard
                news={item}
                image={item.image}
                title={item.title}
                description={item.description}
                chip={
                  <Chip
                    label={moment(item.date).format("DD/MM/YYYY")}
                    color="success"
                  />
                }
                status={item.status}
                onClickDelete={() => deleteNews(item._id)}
                onClickPublish={() => publishNews(item._id)}
                getNews={getNews}
              />
            </Grid>
          ))}
        {newsList?.news ? (
          <Grid item xs={12}>
            <Box
              mt={4}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              {/* Pagination */}
              {newsList?.news && (
                <TablePagination
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={newsList?.allCount}
                  rowsPerPage={newsList?.limit}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Box>
          </Grid>
        ) : (
          <Box sx={{ marginTop: "100px" }}>
            <Loader />
          </Box>
        )}
      </Grid>
      {message.open === true && (
        <ConfirmationNotice
          error={message.error}
          title={
            message.error === true
              ? "An error occurred, try again"
              : message.type === "delete"
              ? "News Deleted"
              : "News Published"
          }
        />
      )}
    </Fragment>
  );
};

export default NewsComponent;
